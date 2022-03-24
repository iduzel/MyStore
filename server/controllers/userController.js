const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO FROM CONTROLLER");
  console.log("User: ", User);
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("userController/register req body is: ", req.body);

    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.send({ success: false, errorId: 1 });

    const newUser = new User(req.body);
    console.log("newUser: ", newUser);
    const user = await newUser.save();
    console.log("user: ", user);

    res.send({ success: true, user });
  } catch (error) {
    console.log("Register Error: ", error.message);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    console.log("login req.body: ", req.body);

    // get user from client side
    const { username, email, password } = req.body;
    if (!(email || username) || !password)
      return res.send({ success: false, errorId: 1 });

    // find user in db
    let user = await User.findOne({
      $or: [{ email }, { username }],
    }).select("-__v");
    console.log("Login: user is", user);
    if (!user)
      return res.send({ success: false }, console.log("user not found"));

    // compare userClient pass and userServer pass
    const passMatch = await user.comparePassword(password, user.password);
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 });

    const userWithToken = await user.generateToken();

    user = user.toObject();
    delete user.pass;
    delete user.token;

    res
      .cookie("cookieStore", userWithToken.token)
      .send({ success: true, user });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.send(error.message);
  }
});

// LOGOUT

router.get('/logout', async (req, res) => {

  try {

      res.clearCookie('cookieStore').send({success: true})
      console.log('logout: user logged out')
      
  } catch (error) {
      
      console.log('Logout ERROR:', error.message)
      res.send(error.message)
  }
})

module.exports = router;
