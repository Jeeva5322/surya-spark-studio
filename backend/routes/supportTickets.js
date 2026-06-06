const express = require("express");
const db = require("../config/db");

const router = express.Router();

/* Get Tickets */

router.get("/", async (req,res)=>{

  try{

    const [rows] = await db.query(`
      SELECT
      s.*,
      u.name
      FROM support_tickets s
      LEFT JOIN users u
      ON s.customer_id = u.id
      ORDER BY s.id DESC
    `);

    res.json(rows);

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

/* Create Ticket */

router.post("/", async (req,res)=>{

  try{

    const {
      customer_id,
      subject,
      message
    } = req.body;

    await db.query(`
      INSERT INTO support_tickets
      (
      customer_id,
      subject,
      message
      )
      VALUES(?,?,?)
    `,
    [
      customer_id,
      subject,
      message
    ]);

    res.json({
      message:"Ticket Created"
    });

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;