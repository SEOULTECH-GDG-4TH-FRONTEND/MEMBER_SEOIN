import styled from "styled-components";
import Button from "../components/Button"; // Button 컴포넌트 불러오기
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { login } from "../apis/user";
import { ReactComponent as Logo } from "../assets/logo.svg"; // 로고 파일을 React 컴포넌트로 불러오기

function Login() {
  const navigate = useNavigate();
  const { setLogin, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("로그인 성공");
      setLogin();
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <LogoWrapper>
          <Logo width="100" height="100" /> {/* 로고 크기 조정 */}
        </LogoWrapper>
        <Title>Log in</Title>
        <InputWrapper>
          <StyledInput
            placeholder="id"
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrapper>
        <ButtonWrapper>
          {/* 로그인 버튼은 핑크색 (green prop 없음) */}
          <Button onClick={handleLogin}>로그인</Button>
          {/* 회원가입 버튼은 초록색 (green prop 전달) */}
          <Button onClick={() => navigate("/signup")} green>
            회원가입
          </Button>
        </ButtonWrapper>
      </LoginContainer>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  font-size: 60px;
  font-style: italic;
  font-weight: 900;
  line-height: 1.2;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 20px; /* 로고와 텍스트 사이에 간격을 줍니다 */
`;

const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 32px;
  color: #000000;
  font-size: 60px;
  font-style: italic;
  font-weight: 900;
  line-height: 1.2;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 24px;
  background: #f5f5f5;
  padding: 0 16px;
  font-size: 16px;
  color: #6d6d6d;
  box-sizing: border-box;

  ::placeholder {
    color: #c1c1c1;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px; /* 버튼 간의 간격 */
  margin-top: 24px;
`;
