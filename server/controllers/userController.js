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
    console.log("userController/register req body is: ",req.body);

    const {email, username, password} = req.body

    if (!email || !username || !password)return res.send({ success: false, errorId: 1 });

  
    const newUser = new User(req.body);
    console.log("newUser: ", newUser);
    const user = await newUser.save();
    console.log("user: ", user);
   
    res.send({ success: true, user});
  } catch (error) {
    console.log("Register Error: ", error.message);
  }
});

// LOGIN

router.post('/login', async (req, res) => {

  try {
    console.log('login req.body: ', req.body)
    
    const { username, email, password } = req.body
    if( !(email || username) || !password) return res.send({success: false, errorId: 1})

    const user = await User.findOne({
      $or: [{ email }, { username }],       
    }).select("-__v");
    console.log("Login: user is", user);
    if (!user) return res.send({success: false}, console.log('user not found'))

    const passMatch = await user.comparePassword(password, user.password); 
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 }); 

    res.send({ success: true, user});
  } catch (error) {
    console.log('LOGIN ERROR:', error.message)
    res.send(error.message)
  }
})
module.exports = router;
