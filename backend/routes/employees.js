const express = require("express");
const db = require("../config/db");

const router = express.Router();

/* Get All Employees */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM employees ORDER BY id DESC"
    );

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* Add Employee */
router.post("/", async (req, res) => {
  try {
    const {
      employee_name,
      phone,
      designation,
      salary,
      joining_date
    } = req.body;

    await db.query(
      `INSERT INTO employees
      (employee_name, phone, designation, salary, joining_date)
      VALUES (?, ?, ?, ?, ?)`,
      [
        employee_name,
        phone,
        designation,
        salary,
        joining_date
      ]
    );

    res.json({
      message: "Employee Added"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;