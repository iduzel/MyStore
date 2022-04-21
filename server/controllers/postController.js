const express = require("express");
const app = express();
const Post = require("../models/PostModel");
const Category = require("../models/CategoryModel");
const router = express.Router();
const multer = require("multer");
//const fileUpload = require("express-fileupload");

//app.use(fileUpload());

const Storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./store/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

// list
router.get("/list", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "owner", select: "username image" })
      .sort({ $natural: -1 });
    res.send({ success: true, posts });
  } catch (error) {
    console.log("posts listing error", error.message);
    res.send(error.message);
  }
});

// add
router.post("/addpost", upload.single('image'),   async (req, res) => {
  try {
    console.log("PostController/post req body is: ", req.body);
    console.log("posts/add file", req.file);

    req.body.image = req.file.filename;

    const newPost = new Post(req.body)
    const post = await newPost.save().then( (item) => item.populate({path: 'owner', select: 'username image'}));

    console.log('post: ', post)

    if (!post) return res.send({success: false, errorId: 2})

   
    
        res.send({success: true, post})

        
    
  } catch (error) {
    console.log("Post Error: ", error.message);
  }
});

module.exports = router;
