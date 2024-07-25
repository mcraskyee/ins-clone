//注册表单的前端组件和逻辑

import { useState } from "react";
import {
  Container,
  Logo,
  Form,
  Input,
  Button,
  SignUpLink,
  ErrorMessage,
} from "./Register.styles";
import instagram from "../../assets/images/instagram-logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveUserID } from "../../Redux/UserData";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  //这样写就避免了写四个useState，类似于[email, setEmail]
  //每个都调用handleChange函数

  const handleSubmit = async (e) => {
    e.preventDefault(); //阻止默认自动跳转，不写formData弹一下就没了
    console.log("formData", formData);

    const unFiledFields = Object.keys(formData).filter((key) => !formData[key]);
    console.log("unFiledFields", unFiledFields);
    //遍历formData，凡是formData里面的key没有值的，就会被存到unFiledFields数组里面
    if (unFiledFields.length > 0) {
      setError(`${unFiledFields.join(", ")} cannot be empty`);
      return;
    }

    //从后端获取数据，如果成功，跳转到home页面，如果失败，显示error message
    try {
      const url = "http://localhost:8000/api/auth/register";
      const response = await axios.post(url, formData);
      console.log("response", response.data);
      dispatch(saveUserID(response.data.userID)); //保存userID
      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
      }); //清空formData
      navigate("/home"); //跳转到home页面
    } catch (error) {
      console.log("error registering user", error.response.data);
      setError(error.response.data.message);
    }
  };

  const handleChange = (e, key) => {
    let obj = { ...formData, [key]: e.target.value };
    setFormData(obj);
    //obj就是formData，key就是formData的四个值。
    //所以要浅拷贝formData，然后再把key的值改变
    //e.target.value就是input里面的值，就是key的值
    //再用setFormData来更新formData
  };

  return (
    <Container>
      <Logo src={instagram} alt="Instagram" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange(e, "fullName")}
          // 因为四个参数共享一个handleChange函数
          //所以需要让handleChange函数知道是执行哪个参数
        />
        <Input
          type="text"
          placeholder="Email or Mobile Number"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
        />
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
        <Button type="submit">Sign Up</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* 有error的时候才会显示error message */}
      <SignUpLink>
        Already have an account? <Link to="/login">Log in</Link>
      </SignUpLink>
    </Container>
  );
};

export default Register;
