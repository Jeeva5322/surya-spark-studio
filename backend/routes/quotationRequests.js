const express = require("express");
const db = require("../config/db");

const router = express.Router();

/* Get All Requests */

router.get("/", async (req,res)=>{

  try{

    const [rows] = await db.query(
      "SELECT * FROM quotation_requests ORDER BY id DESC"
    );

    res.json(rows);

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

/* Create Request */

router.post("/", async (req,res)=>{

  try{

    const {
      customer_name,
      phone,
      email,
      project_type,
      location,
      area_sqft,
      description
    } = req.body;

    await db.query(`
      INSERT INTO quotation_requests
      (
      customer_name,
      phone,
      email,
      project_type,
      location,
      area_sqft,
      description
      )
      VALUES(?,?,?,?,?,?,?)
    `,
    [
      customer_name,
      phone,
      email,
      project_type,
      location,
      area_sqft,
      description
    ]);

    res.json({
      message:"Request Submitted"
    });

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;