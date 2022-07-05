const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/users", require("./controllers/userController"));
app.use("/employees", require("./controllers/employeeController"));
app.use("/admin", require("./controllers/adminController"));
app.use("/posts", require("./controllers/postController"));

const connectToMongoDB = require("./config/db");
connectToMongoDB();

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running at port ${port}`));

app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  );
}

