import { useParams } from "react-router-dom";
import { InfoContainer, Info, Stats, Bio, LoadIcon } from "./Profile.styles";
import { initialState as profileData } from "../../Redux/ProfileData";
import { initialState as postData } from "../../Redux/PostData";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Fragment, useState } from "react";
import CreateProfile from "./CreateProfile";

const ProfileInfo = () => {
  const { id } = useParams();
  console.log("id", id);

  // 过滤出与id相同的用户
  let filteredPosts = postData.filter((post) => {
    return post.userID === id;
  });

  const [profile, setProfile] = useState(null); //默认没有profile
  const [isProfileCreated, setIsProfileCreated] = useState(false); //默认没有创建profile
  const [isLoading, setIsLoading] = useState(true); //默认是loading状态

  if (isLoading) {
    return <LoadIcon>Loading...</LoadIcon>;
  }

  return (
    <Fragment>
      {profile ? (
        <InfoContainer>
          <img src={profileData[id].profilePic} alt="profile" />
          <Info>
            {/* 检查认证 */}
            <p className="owner-ID">
              {profileData[id].userID}
              {profileData[id].verified ? (
                <CheckCircle className="verified" />
              ) : null}
            </p>
            <Stats>
              <p>
                <strong>{filteredPosts.length}</strong> Posts
              </p>
              <p>
                <strong>{profileData[id].followers}</strong> Followers
              </p>
              <p>
                <strong>{profileData[id].following}</strong> Following
              </p>
            </Stats>
            <Bio>
              <p className="name">
                <strong>{profileData[id].name}</strong>
              </p>
              <p className="category">{profileData[id].category}</p>
              <p>{profileData[id].bio}</p>
            </Bio>
          </Info>
        </InfoContainer>
      ) : (
        // 如果profile存在，显示以上用户信息
        <InfoContainer>
          <CreateProfile userID={id} />
        </InfoContainer>
        // 如果profile不存在，显示创建profile页面，以上逻辑用三元运算符实现
      )}
    </Fragment>
  );
};

export default ProfileInfo;
