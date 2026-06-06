require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const quotationRoutes = require("./routes/quotations");
const employeeRoutes = require("./routes/employees");
const paymentRoutes = require("./routes/payments");
const projectRoutes = require("./routes/projects");
const quotationRequestRoutes = require("./routes/quotationRequests");
const supportTicketRoutes = require("./routes/supportTickets");
const customerRoutes = require("./routes/customer");

const auth = require("./middleware/authMiddleware");

const app = express();

// FIX 3: Lock CORS to your frontend domain only
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// FIX 7: Rate limiting on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many requests, please try again later." },
});

app.get("/", (req, res) => {
  res.send("Surya Electricals API Running");
});

/* Routes */

// Auth routes — public but rate-limited
app.use("/api/auth", authLimiter, authRoutes);

// FIX 1: All sensitive routes protected with auth middleware
app.use("/api/dashboard",           auth, dashboardRoutes);
app.use("/api/users",               auth, usersRoutes);
app.use("/api/quotations",          auth, quotationRoutes);
app.use("/api/employees",           auth, employeeRoutes);
app.use("/api/payments",            auth, paymentRoutes);
app.use("/api/projects",            auth, projectRoutes);
app.use("/api/quotation-requests",  auth, quotationRequestRoutes);
app.use("/api/support-tickets",     auth, supportTicketRoutes);
app.use("/api/customer",            auth, customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
