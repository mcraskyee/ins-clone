import { useParams } from "react-router-dom";
import { InfoContainer, Info, Stats, Bio, LoadIcon } from "./Profile.styles";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Fragment, useState, useEffect } from "react";
import CreateProfile from "./CreateProfile";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { id } = useParams();
  console.log("id", id);

  //获取所有的post数据
  const postData = useSelector((state) => state.post.postData);

  // 过滤出与id相同的用户
  let filteredPosts = postData.filter((post) => {
    return post.userID === id;
  });

  const [profile, setProfile] = useState(null); //默认没有profile
  const [isProfileCreated, setIsProfileCreated] = useState(false); //默认没有创建profile
  const [isLoading, setIsLoading] = useState(true); //默认是loading状态

  //加载用户信息
  useEffect(() => {
    const url = `http://localhost:8000/api/profiles/${id}`;
    axios
      .get(url)
      .then((response) => {
        console.log("res", response.data);
        setProfile(response.data); //根据id获取用户信息
        setIsLoading(false); //加载完毕
      })
      .catch((error) => {
        console.error("Error fetching profile: ", error);
        setIsLoading(false); //失败了也要加载完毕
      });
  }, [id, isProfileCreated]);

  if (isLoading) {
    return <LoadIcon>Loading...</LoadIcon>;
  }

  return (
    <Fragment>
      {profile ? (
        <InfoContainer>
          <img
            src={`http://localhost:8000/api/profiles/image/${profile.userID}`}
            alt="profile picture"
          />
          <Info>
            {/* 检查认证 */}
            <p className="owner-ID">
              {profile.userID}
              {profile.verified ? <CheckCircle className="verified" /> : null}
            </p>
            <Stats>
              <p>
                <strong>{filteredPosts.length}</strong> Posts
              </p>
              <p>
                <strong>{profile.followers}</strong> Followers
              </p>
              <p>
                <strong>{profile.following}</strong> Following
              </p>
            </Stats>
            <Bio>
              <p className="name">
                <strong>{profile.name}</strong>
              </p>
              <p className="category">{profile.category}</p>
              <p>{profile.bio}</p>
            </Bio>
          </Info>
        </InfoContainer>
      ) : (
        // 如果profile存在，显示以上用户信息
        <InfoContainer>
          <CreateProfile
            userID={id}
            setIsProfileCreated={setIsProfileCreated}
          />
        </InfoContainer>
        // 如果profile不存在，显示创建profile页面，以上逻辑用三元运算符实现
      )}
    </Fragment>
  );
};

export default ProfileInfo;
