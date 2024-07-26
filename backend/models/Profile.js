const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userID:{type:String, required:true, unique:true},
  profilePic:{type:Buffer},
  followers:{type:String},
  following:{type:Number},
  name:{type:String},
  category:{type:String},
  bio:{type:String},
  verified:{type:Boolean},
});

//创建一个叫Profile的model
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;