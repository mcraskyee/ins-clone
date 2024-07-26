//显示器上只显示这一页

import { Container } from "./Profile.styles";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import NavBar from "../Navbar/Navbar";

const Profile = () => {
  return (
    <Container>
      <NavBar />
      <ProfileInfo />
      <ProfilePosts />
    </Container>
  );
};

export default Profile;
