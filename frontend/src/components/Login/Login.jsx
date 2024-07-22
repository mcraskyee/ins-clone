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

const Login = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault(); //阻止默认自动跳转，不写formData弹一下就没了
    console.log("formData", formData);

    const unFiledFields = Object.keys(formData).filter((key) => !formData[key]);
    //遍历formData，凡是formData里面的key没有值的，就会被存到unFiledFields数组里面
    console.log("unFiledFields", unFiledFields);
    if (unFiledFields.length > 0) {
      setError(`${unFiledFields.join(", ")} cannot be empty`);
      return;
    }
    console.log("ready to login");
    //如果unFieldFields里有值，就会显示setError里面的内容，否则显示成功注册
    navigate("/home");
    //跳转到home页面
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
