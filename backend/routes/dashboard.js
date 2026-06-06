const express = require("express");
console.log("Dashboard Route Loaded");
const router = express.Router();
const db = require("../config/db");

/* Dashboard Stats */

router.get("/stats", async (req, res) => {

  try {

    const [customers] =
      await db.query(
        "SELECT COUNT(*) AS totalCustomers FROM users WHERE role='customer'"
      );

    const [quotations] =
      await db.query(
        "SELECT COUNT(*) AS totalQuotations FROM quotations"
      );

    const [projects] =
      await db.query(
        "SELECT COUNT(*) AS totalProjects FROM projects"
      );

    const [payments] =
      await db.query(
        "SELECT IFNULL(SUM(amount),0) AS totalRevenue FROM payments"
      );

    res.json({
      totalCustomers: customers[0].totalCustomers,
      totalQuotations: quotations[0].totalQuotations,
      totalProjects: projects[0].totalProjects,
      totalRevenue: payments[0].totalRevenue
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;