import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { createQuestion } from "../apis/qna";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";

function Question() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  const [profileIcon, setProfileIcon] = useState("");

  useEffect(() => {
    setProfileIcon(getProfileIcon(user.id));
  }, [user.id]);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!user) {
    return <div>유저 정보가 없습니다.</div>;
  }

  const handleSubmit = async () => {
    try {
      await createQuestion({ targetId: user.id, content });
      alert("질문을 성공적으로 작성했습니다.");
      navigate("/");
    } catch {
      alert("질문을 작성하는 데 실패했습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <TitleWrapper>
          <Title>🙋🏻 {user.username}에게 질문할게요‼️</Title>
        </TitleWrapper>
        <CardContainer>
          <ProfileImage id={user.id}>{profileIcon}</ProfileImage>
          <UserInfo>
            <UserName>{user.username}</UserName>
            <UserBio>{user.bio}</UserBio>
          </UserInfo>
        </CardContainer>
        <QuestionArea
          placeholder="질문을 입력하세요..."
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonWrapper>
          <StyledButton onClick={handleSubmit}>보내기</StyledButton>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
}

export default Question;

// 스타일 컴포넌트
const Wrapper = styled.div`
  display: flex;
  padding: 50px 85px;
  flex-direction: column;
  position: relative;
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 24px;
  color: #454545;
  font-weight: 700;
  background-color: #f5f5f5;
  padding: 8px 15px;
  border-radius: 30px;
  max-width: 300px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 15px 16px;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 26px;
`;

const ProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
`;

const UserName = styled.h2`
  font-size: 20px;
  color: #333;
`;

const UserBio = styled.p`
  font-size: 14px;
  color: #666;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: center;
  gap: 5px;
`;

const QuestionArea = styled.textarea`
  resize: none;
  border-radius: 16px;
  height: 309px;
  width: 100%;
  padding: 31px 27px;
  margin-bottom: 42px;
  background-color: #f5f5f5;
  font-size: 16px;
  color: #333;
  border: none;

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  width: 200px; /* 버튼 길이 설정 */
  height: 55px; /* 버튼 높이 설정 */
  font-size: 16px;
  font-weight: bold;
  background-color: #e4a4b3; /* 기존 핑크색 버튼 */
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d38aa2; /* hover 시 색상 변경 */
  }
`;
