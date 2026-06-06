const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* Get Quotations */

router.get("/", async (req, res) => {

  try {

    const [rows] =
      await db.query("SELECT * FROM quotations");

    res.json(rows);

  } catch(error){

    console.log(error);

    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;