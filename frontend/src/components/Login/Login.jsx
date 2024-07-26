import { useState } from "react";
import {
  Container,
  Logo,
  Form,
  Input,
  Button,
  ErrorMessage,
  SignUpLink,
} from "./Login.styles";
import instagram from "../../assets/images/instagram-logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../../apiConfig";
import { useDispatch } from "react-redux";
import { saveUserID } from "../../Redux/UserData";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e, key) => {
    const obj = { ...formData, [key]: e.target.value };
    setFormData(obj);
  };
  //obj就是formData，key就是formData的四个值。
  //所以要浅拷贝formData，然后再把key的值改变
  //e.target.value就是input里面的值，就是key的值
  //再用setFormData来更新formData

  const handleSubmit = async (e) => {
    e.preventDefault(); //阻止默认自动跳转，不写formData弹一下就没了
    console.log("formData", formData);

    const unFiledFields = Object.keys(formData).filter((key) => !formData[key]);
    //遍历formData，凡是formData里面的key没有值的，就会被存到unFiledFields数组里面
    console.log("unFiledFields", unFiledFields);
    if (unFiledFields.length > 0) {
      setError(`${unFiledFields.join(", ")} cannot be empty`);
      return;
    }

    //从后端获取数据，如果成功，跳转到home页面，如果失败，显示error message
    try {
      const url = "http://localhost:8000/api/auth/login";
      const response = await axios.post(url, formData);
      console.log("response", response.data); //返回token, userID
      setAuthToken(response.data.token); //设置token
      dispatch(saveUserID(response.data.userID)); //保存userID
      setFormData({ username: "", password: "" }); //清空formData
      navigate("/home"); //跳转到home页面
    } catch (error) {
      console.log("error logging in user", error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <Container>
      <Logo src={instagram} alt="Instagram" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleChange(e, "username")}
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
        />
        <Button type="submit">Login</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SignUpLink>
        Do not have an account? <Link to="/register">Sign up</Link>
      </SignUpLink>
    </Container>
  );
};

export default Login;
