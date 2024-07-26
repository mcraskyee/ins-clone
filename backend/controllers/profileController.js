const Profile = require('../models/Profile');

const createProfile = async (req, res) => {
  try{
    const { userID, followers, following, name, category, bio, verified } = 
    req.body;
    const profilePic = req.files.profilePic.data;
    const existingProfile = await Profile.findOne({userID});
    if(existingProfile){
      return res.status(400).json({message: "Profile already exists"});
    }
    const profile = new Profile({
      userID,
      profilePic,
      followers,
      following,
      name,
      category,
      bio,
      verified,
    });
    console.log("profile", profile);
    await profile.save();
    return res.status(201).json({message: "Profile created successfully"});
  } catch(error){
    console.error("Error in createProfile: ", error);
    res.status(500).json({message: "Internal Server Error"});
  }
};

const getUserProfile = async (req,res) => {
  try{
    const userID = req.params.userID;
    const profile = await Profile.findOne({userID});
    if(!profile){
      return res.status(404).json({message: "Profile not found"});
    }
    res.json(profile);
  } catch(error){
    console.error("Error fetching profile: ", error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

const getAllProfiles = async (req, res) => {
  Profile.find({})
  .then((profiles)=>{
    if (!profiles){
      return res.status(404).json({message: "No profiles found"});
    }
    return res.status(200).json(profiles);
  })
  .catch((error)=>{
    console.error("Error fetching profiles: ", error);
    return res.status(500).json({message: "Internal Server Error"});
  });
};

module.exports = {createProfile, getUserProfile, getAllProfiles};