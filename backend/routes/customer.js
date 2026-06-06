const express = require("express");
const router = express.Router();
const db = require("../config/db");

// FIX 2: Verify customer can only access their own data (IDOR protection)
router.get("/dashboard/:id", async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);

    // Only allow if the logged-in user matches the requested id,
    // OR if the user is an admin
    if (req.user.role !== "admin" && req.user.id !== customerId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const [quotations] = await db.query(
      "SELECT COUNT(*) total FROM quotations WHERE customer_id=?",
      [customerId]
    );

    const [approved] = await db.query(
      "SELECT COUNT(*) total FROM quotations WHERE customer_id=? AND status='Approved'",
      [customerId]
    );

    const [projects] = await db.query(
      "SELECT COUNT(*) total FROM projects WHERE customer_id=?",
      [customerId]
    );

    const [payments] = await db.query(
      "SELECT IFNULL(SUM(amount),0) total FROM payments WHERE customer_id=?",
      [customerId]
    );

    res.json({
      totalQuotations: quotations[0].total,
      approvedQuotations: approved[0].total,
      totalProjects: projects[0].total,
      totalPayments: payments[0].total,
    });

  } catch (error) {
    // FIX 6: Never leak internal error details
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
