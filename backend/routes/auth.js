const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const crypto = require("crypto");

const router = express.Router();

/* ─────────────────────────────────────────────
   STEP 1: User submits only their email
   Status → pending_approval
───────────────────────────────────────────── */
router.post("/request-access", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    // Check if already in system
    const [existing] = await db.query(
      "SELECT id, status FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      const user = existing[0];
      if (user.status === "pending_approval") {
        return res.status(409).json({ message: "Your request is already pending admin approval." });
      }
      if (user.status === "approved" || user.status === "active") {
        return res.status(409).json({ message: "This email is already registered. Please login." });
      }
      if (user.status === "rejected") {
        return res.status(403).json({ message: "Your access request was rejected. Contact support." });
      }
    }

    // Insert new access request
    await db.query(
      `INSERT INTO users (email, status, role, created_at)
       VALUES (?, 'pending_approval', 'customer', NOW())`,
      [email]
    );

    res.status(201).json({
      message: "Access request submitted. You will be notified once approved by the admin."
    });

  } catch (error) {
    console.error("Request access error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

/* ─────────────────────────────────────────────
   STEP 2a: Admin approves email → generates token
───────────────────────────────────────────── */
router.post("/admin/approve", async (req, res) => {
  try {
    const adminToken = req.headers.authorization?.split(" ")[1];
    if (!adminToken) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const { userId } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE id = ? AND status = 'pending_approval'",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pending user not found" });
    }

    // Generate a secure one-time setup token (expires 24h)
    const setupToken = crypto.randomBytes(32).toString("hex");
    const setupTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.query(
      `UPDATE users SET status='approved', setup_token=?, setup_token_expiry=?
       WHERE id = ?`,
      [setupToken, setupTokenExpiry, userId]
    );

    // In production: send email with the setup link
    // For now, return the token in the response so admin can share the link
    const setupLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/set-password?token=${setupToken}`;

    res.json({
      message: "User approved. Send them the password setup link.",
      setupLink
    });

  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ─────────────────────────────────────────────
   STEP 2b: Admin rejects email
───────────────────────────────────────────── */
router.post("/admin/reject", async (req, res) => {
  try {
    const adminToken = req.headers.authorization?.split(" ")[1];
    if (!adminToken) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const { userId } = req.body;

    await db.query(
      "UPDATE users SET status='rejected' WHERE id = ? AND status = 'pending_approval'",
      [userId]
    );

    res.json({ message: "User request rejected." });

  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ─────────────────────────────────────────────
   STEP 2c: Get all pending requests (admin)
───────────────────────────────────────────── */
router.get("/admin/pending-users", async (req, res) => {
  try {
    const adminToken = req.headers.authorization?.split(" ")[1];
    if (!adminToken) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const [rows] = await db.query(
      `SELECT id, email, status, created_at FROM users
       WHERE status IN ('pending_approval', 'approved', 'rejected')
       ORDER BY created_at DESC`
    );

    res.json(rows);

  } catch (error) {
    console.error("Pending users error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ─────────────────────────────────────────────
   STEP 3: Verify setup token (before showing password form)
───────────────────────────────────────────── */
router.get("/verify-setup-token/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const [rows] = await db.query(
      `SELECT id, email, status, setup_token_expiry
       FROM users
       WHERE setup_token = ? AND status = 'approved'`,
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired setup link." });
    }

    const user = rows[0];
    if (new Date() > new Date(user.setup_token_expiry)) {
      return res.status(400).json({ message: "Setup link has expired. Contact admin for a new one." });
    }

    res.json({ valid: true, email: user.email });

  } catch (error) {
    console.error("Verify token error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ─────────────────────────────────────────────
   STEP 4: User sets password
───────────────────────────────────────────── */
router.post("/set-password", async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    // Verify token again
    const [rows] = await db.query(
      `SELECT id, email, setup_token_expiry
       FROM users
       WHERE setup_token = ? AND status = 'approved'`,
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired setup link." });
    }

    const user = rows[0];
    if (new Date() > new Date(user.setup_token_expiry)) {
      return res.status(400).json({ message: "Setup link has expired. Contact admin." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Activate account, clear setup token
    await db.query(
      `UPDATE users
       SET password = ?, status = 'active', setup_token = NULL, setup_token_expiry = NULL
       WHERE id = ?`,
      [hashedPassword, user.id]
    );

    res.json({ message: "Password set successfully. You can now login." });

  } catch (error) {
    console.error("Set password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ─────────────────────────────────────────────
   STEP 5: Login (only active users)
───────────────────────────────────────────── */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    // Status-specific messages
    if (user.status === "pending_approval") {
      return res.status(403).json({ message: "Your account is pending admin approval." });
    }
    if (user.status === "rejected") {
      return res.status(403).json({ message: "Your access was rejected. Contact support." });
    }
    if (user.status === "approved") {
      return res.status(403).json({ message: "Please complete your password setup using the link sent to you." });
    }
    if (user.status !== "active") {
      return res.status(403).json({ message: "Account is not active." });
    }

    if (!user.password) {
      return res.status(403).json({ message: "Password not set. Check your setup email." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _pw, setup_token: _st, ...safeUser } = user;

    res.json({ token, role: user.role, user: safeUser });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
