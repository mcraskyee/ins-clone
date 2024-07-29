const Post = require("../models/Post");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  Post.find({})
  .then((posts)=>{
    if (!posts){
      return res.status(404).json({message: "No posts found"});
    }
    return res.status(200).json(posts);
  })
  .catch((error)=>{
    console.error("Error fetching posts: ", error);
    return res.status(500).json({message: "Internal Server Error"});
  });
};

const createPost = async (req,res) =>{
  console.log("body", req.body);
  try{
    const {
      userID,
      profilePic,
      location,
      name,
      likes,
      isLiked,
      caption,
      comments,
      postID} = req.body;
    const postLink = req.files.postLink.data;

    //创建新的post
    const newPost = new Post({
      userID,
      profilePic,
      location,
      postLink,
      name,
      likes,
      isLiked,
      caption,
      comments,
      postID,
    });
    //保存post到数据库，返回
    await newPost.save();
    return res.status(201).json({
      message: "Post created successfully", 
      post: newPost
    });
  } catch (error){
    console.error("Error in create post: ", error);
    return res.status(500).json({message: "Internal Server Error"});
  }
}

module.exports = {getAllPosts, createPost};