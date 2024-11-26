import styled from "styled-components";
import Button from "../components/Button"; // Button 컴포넌트 불러오기
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { signup } from "../apis/user";

function SignUp() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSignup = async () => {
    try {
      await signup(username, password1, password2, email);
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패");
    }
  };

  return (
    <Wrapper>
      <SignupContainer>
        <Title>Sign up</Title>
        <InputWrapper>
          <StyledInput
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledInput
            placeholder="비밀번호"
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <StyledInput
            placeholder="비밀번호 확인"
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <StyledInput
            placeholder="닉네임"
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <ButtonWrapper>
          {/* 회원가입 버튼은 핑크색 */}
          <Button onClick={handleSignup}>회원가입</Button>
          {/* 돌아가기 버튼은 초록색 */}
          <Button onClick={() => navigate("/login")} green>
            돌아가기
          </Button>
        </ButtonWrapper>
      </SignupContainer>
    </Wrapper>
  );
}

export default SignUp;

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

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
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
