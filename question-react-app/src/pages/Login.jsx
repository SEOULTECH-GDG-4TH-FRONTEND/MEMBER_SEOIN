import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { login } from "../apis/user";
import { ReactComponent as Logo } from "../assets/logo.svg";

function Login() {
  const navigate = useNavigate();
  const { setLogin, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/main"); // 로그인되어 있다면 메인 페이지로 이동
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("로그인 성공");
      setLogin();
      navigate("/main"); // 로그인 후 메인 페이지로 이동
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <LogoWrapper>
          <Logo width="100" height="100" />
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
          <Button onClick={handleLogin}>로그인</Button>
          <Button onClick={() => navigate("/signup")} green>
            회원가입
          </Button>
        </ButtonWrapper>
      </LoginContainer>
    </Wrapper>
  );
}

export default Login;

// 스타일 컴포넌트 정의
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: flex-start; /* 수직 상단 정렬 */
  background: #ffffff;
  padding-top: 100px; /* 상단에 약간의 여백 */
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 10px; /* 로고와 텍스트 사이의 간격을 줄입니다 */
`;

const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 24px; /* 타이틀과 입력란 사이의 간격을 줄입니다 */
  color: #000000;
  font-size: 48px;
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
  margin-top: 16px; /* 버튼 영역 위쪽 여백을 줄여 전체를 위로 올립니다 */
`;
