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

const getPostImage = async (req, res) => {
  try{
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post || !post.postLink){
      return res.status(404).json({message: "Image not found"});
    }
    res.contentType("image/png");
    res.send(post.postLink);
  } catch(error){
    console.error("Error serving image: ", error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

const updatePosts = async (req, res) => {
  try{
    const { id } = req.params;
    const {likes, isLiked, comments} = req.body;
    //把id转换成mongoose的ObjectId
    const postObjectId = new mongoose.Types.ObjectId(id);
    const updatedFields = {};
    if (likes !== undefined) {
      updatedFields.likes = likes;
    };
    if (comments !== undefined){
      updatedFields.comments = comments;
    }
    if (isLiked !== undefined){
      updatedFields.isLiked = isLiked;
    }
    const updatedPost = await Post.findOneAndUpdate(
      {_id: postObjectId},
      {$set: updatedFields},//用$set更新字段
      {new: true},
    );
    if (!updatedPost){
      return res.status(404).json({error: "Post not found"});
    }
    res.json(updatedPost);
  } catch (error){
    console.error("Error updating post data: ", error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {getAllPosts, createPost, getPostImage, updatePosts};