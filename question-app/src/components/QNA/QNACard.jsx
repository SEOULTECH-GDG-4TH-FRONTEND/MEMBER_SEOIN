import styled from "styled-components";
import { getBackgroundColor, getProfileIcon } from "../ProfileCard";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const QNACard = ({
  userId,
  username,
  content,
  received,
  answer,
  questionId,
}) => {
  const navigate = useNavigate();
  const [profileIcon, setProfileIcon] = useState("");

  useEffect(() => {
    if (!userId) return;
    setProfileIcon(getProfileIcon(userId));
  }, [userId]);

  const handleAnswer = () => {
    console.log(questionId);
    navigate("/answer", {
      state: { user: { id: userId }, questionId: questionId },
    });
  };

  return (
    <CardContainer>
      <UserInfo>
        <CardProfileImage id={userId}>{profileIcon}</CardProfileImage>
        <CardUserName>{username}</CardUserName>
      </UserInfo>
      <RightSection>
        <CardContent>{content}</CardContent>
        {answer === null && received && (
          <StyledButton onClick={handleAnswer}>답변하기</StyledButton>
        )}
      </RightSection>
    </CardContainer>
  );
};

export default QNACard;

// 스타일 컴포넌트 정의
const RightSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

const CardProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 60px; /* 이미지 크기 축소 */
  height: 60px; /* 이미지 크기 축소 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px; /* 프로필 아이콘 크기 축소 */
`;

const CardContent = styled.div`
  margin-left: 20px; /* 왼쪽 여백 축소 */
  font-size: 16px; /* 텍스트 크기 축소 */
  color: #454545;
  font-weight: 300;
`;

const CardContainer = styled.div`
  display: flex;
  padding: 10px 12px; /* 패딩 축소 */
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 축소 */
  align-items: center; /* 카드 높이를 줄이기 위해 아이템 가운데 정렬 */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* 간격 축소 */
`;

const CardUserName = styled.h3`
  font-size: 16px; /* 사용자 이름 텍스트 크기 축소 */
`;

const StyledButton = styled(Button)`
  padding: 8px 12px; /* 버튼 패딩 축소 */
  font-size: 14px; /* 버튼 텍스트 크기 축소 */
`;
