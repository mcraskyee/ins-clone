import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Logo = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  width:300px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  background-color: #fafafa;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #0095f6;
  color: white;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const SignUpLink = styled.p`
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  color: red;
`;