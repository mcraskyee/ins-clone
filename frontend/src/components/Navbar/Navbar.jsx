import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavBar, InputField, OtherIcons } from "./Navbar.styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import defaultIcon from "../../assets/images/user.png";

const Navbar = () => {
  const navigateTo = useNavigate();
  const searchValue = useRef();
  const userID = useSelector((state) => state.user.userID); //获取userID
  const profiles = useSelector((state) => state.profile.profileData); //获取profileData
  const currentProfile = profiles.length
    ? profiles.filter((profile) => profile.userID === userID)
    : null;
  //如果profileData里面有userID，isProfileAvailable就是true

  const [dropdownState, setDropdownState] = useState(false); //一开始不显示dropdown
  const [imgPath, setImgPath] = useState(""); //设置图片路径

  useEffect(() => {
    if (currentProfile) {
      const url = `http://localhost:8000/api/profiles/image/${userID}`;
      setImgPath(url); //设置图片路径
    }
  }, [currentProfile, userID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = searchValue.current.value; //value是userID
    if (!value) return; //如果没有userID，直接返回
    navigateTo(`/profile/${value}`); //如果有，跳转到相应userID的profile页面
  };

  const likeBtn = (event) => {
    let color = event.target.style.color;
    if (color === "tomato") {
      color = "black";
    } else {
      color = "tomato";
    }
    event.target.style.color = color;
  };

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState); //点击dropdown按钮显示dropdown
  };

  return (
    <>
      <NavBar>
        <div id="nav-items">
          <Link to="/home">
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt="logo"
            />
          </Link>
          <InputField>
            <SearchIcon style={{ color: "gray", fontSize: 20 }} />
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Search" ref={searchValue} />
            </form>
          </InputField>
          <OtherIcons>
            <div className="home">
              <Link to="/home">
                <HomeIcon style={{ fontSize: 30 }} />
              </Link>
            </div>
            <div className="chat">
              <Link to={`/contact/${userID}`}>
                <ChatBubbleOutlineIcon />
              </Link>
            </div>
            <div className="heart">
              <Link>
                <FavoriteIcon onClick={likeBtn} />
              </Link>
            </div>
            <div className="dropdown-menu">
              <img
                src={
                  currentProfile && currentProfile.length
                    ? imgPath
                    : defaultIcon
                }
                //如果currentProfile为true并且不为null，显示imgPath，否则显示defaultIcon
                alt="profile-pic"
                onClick={handleDropdownClick}
              />
              <div
                className={`dropdown-items ${
                  dropdownState ? "isVisible" : "isHidden"
                }`}
                // 如果dropdownState为true，显示isVisible的style，否则显示isHidden的
              >
                <div className="dropdown-item">
                  <Link to={`/profile/${userID}`}>
                    <div className="dropdown__link">Profile</div>
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/post">
                    <div className="dropdown__link">Post</div>
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/login">
                    <div className="dropdown__link">Logout</div>
                  </Link>
                </div>
              </div>
            </div>
          </OtherIcons>
        </div>
      </NavBar>
    </>
  );
};

export default Navbar;
