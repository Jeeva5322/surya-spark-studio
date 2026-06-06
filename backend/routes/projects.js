const express = require("express");
const db = require("../config/db");

const router = express.Router();

/* Get Projects */

router.get("/", async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT
      p.*,
      u.name AS customer_name
      FROM projects p
      LEFT JOIN users u
      ON p.customer_id = u.id
      ORDER BY p.id DESC
    `);

    res.json(rows);

  } catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

/* Add Project */

router.post("/", async (req,res)=>{

  try{

    const {
      customer_id,
      quotation_id,
      project_name,
      status,
      start_date,
      end_date
    } = req.body;

    await db.query(`
      INSERT INTO projects
      (
      customer_id,
      quotation_id,
      project_name,
      status,
      start_date,
      end_date
      )
      VALUES(?,?,?,?,?,?)
    `,
    [
      customer_id,
      quotation_id,
      project_name,
      status,
      start_date,
      end_date
    ]);

    res.json({
      message:"Project Created"
    });

  }catch(error){

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;