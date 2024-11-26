import React, { useEffect, useState } from "react";
import styled from "styled-components";

// ID에 따라 배경색을 다르게 설정
export const getBackgroundColor = (id) => {
  switch (id % 4) {
    case 0:
      return "#FFDDC1";
    case 1:
      return "#D5D0FF";
    case 2:
      return "#FFD1DC";
    case 3:
      return "#D0ECFF";
    default:
      return "#AEEEE3";
  }
};

// ID에 따라 이모지를 다르게 설정
export const getProfileIcon = (id) => {
  switch (id % 4) {
    case 0:
      return "🐶";
    case 1:
      return "🦊";
    case 2:
      return "🐰";
    case 3:
      return "🐯";
    default:
      return "🐵";
  }
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 240px; /* 카드 너비 설정 */
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.2s;
  }
`;

const ProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 15px;
`;

const UserName = styled.h2`
  font-size: 16px;
  margin: 0;
  font-weight: bold;
  color: #333;
`;

const UserBio = styled.p`
  font-size: 14px;
  color: #666;
  margin: 8px 0;
`;

const QuestionCount = styled.p`
  font-size: 14px;
  color: #999;
  margin-top: auto;
  display: flex;
  align-items: center;

  &::before {
    content: "💬";
    margin-right: 5px;
  }
`;

const ProfileCard = ({ id, name, bio, questionCount, onClick }) => {
  const [profileIcon, setProfileIcon] = useState("");

  useEffect(() => {
    setProfileIcon(getProfileIcon(id));
  }, [id]);

  return (
    <CardContainer onClick={onClick}>
      <ProfileImage id={id}>{profileIcon}</ProfileImage>
      <UserName>{name}</UserName>
      <UserBio>{bio}</UserBio>
      <QuestionCount>{`받은 질문 ${questionCount}개`}</QuestionCount>
    </CardContainer>
  );
};

export default ProfileCard;
