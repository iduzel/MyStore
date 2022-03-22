const express = require("express");
const UserS = require("../models/UserModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO FROM CONTROLLER");
  console.log("UserS: ", UserS);
});

router.post("/register", async (req, res) => {
  try {
    console.log("req.body is", req.body);

    //const { username, email, password } = req.body;

    const newUserC = new UserS(req.body);
    console.log("newUserC: ", newUserC);
    const userC2 = await newUserC.save();
    console.log("demo");
    res.send("demo");
    res.send({ success: true, userC2 });
  } catch (error) {
    console.log("Register Error: ", error.message);
  }
});

module.exports = router;
