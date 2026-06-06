const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* Get All Customers */

router.get("/", async (req, res) => {

  try {

    const [users] =
      await db.query(
        "SELECT id,name,email,phone,role,created_at FROM users"
      );

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;