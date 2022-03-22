const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/users", require("./controllers/userController"));

app.get("/", (req, res) => {
  res.send("HELLO FROM STORE SERVIS");
});
const connectToMongoDB = require("./config/db");
connectToMongoDB();

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running at port ${port}`));
