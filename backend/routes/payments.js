const express = require("express");
const db = require("../config/db");

const router = express.Router();

/* Get Payments */

router.get("/", async (req,res)=>{

  try{

    const [rows] = await db.query(`
      SELECT
      p.*,
      u.name AS customer_name
      FROM payments p
      LEFT JOIN users u
      ON p.customer_id = u.id
      ORDER BY p.id DESC
    `);

    res.json(rows);

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

/* Add Payment */

router.post("/", async (req,res)=>{

  try{

    const {
      customer_id,
      amount,
      payment_type,
      payment_status,
      payment_date
    } = req.body;

    await db.query(`
      INSERT INTO payments
      (
      customer_id,
      amount,
      payment_type,
      payment_status,
      payment_date
      )
      VALUES(?,?,?,?,?)
    `,
    [
      customer_id,
      amount,
      payment_type,
      payment_status,
      payment_date
    ]);

    res.json({
      message:"Payment Added"
    });

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;