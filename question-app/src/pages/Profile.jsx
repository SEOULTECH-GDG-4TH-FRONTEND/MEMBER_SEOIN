import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../apis/user";
import styled from "styled-components";
import { getBackgroundColor, getProfileIcon } from "../components/ProfileCard";
import QuestionSection from "../components/QNA/QuestionSection";
import AnswerSection from "../components/QNA/AnswerSection";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../apis/user"; // 로그아웃 API 함수 가져오기

function Profile() {
  const { setLogout } = useAuth(); // 로그아웃 상태 변경 함수 가져오기
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileIcon, setProfileIcon] = useState("");
  const [activeMenu, setActiveMenu] = useState("질문");

  useEffect(() => {
    if (!profile) return;
    setProfileIcon(getProfileIcon(profile.id));
  }, [profile]);

  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await getProfile();
        setProfile(profile);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 API 호출
      alert("로그아웃 성공");
      setLogout(); // 로그인 상태 변경
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      alert("로그아웃 실패");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <UserProfile>
          <ProfileImage id={profile?.id}>{profileIcon}</ProfileImage>
          <UserName>{profile?.username}</UserName>
          <UserBio>{profile?.bio}</UserBio>
        </UserProfile>
        <QNAContainer>
          <Menu>
            <MenuButton
              active={activeMenu === "질문"}
              onClick={() => setActiveMenu("질문")}
            >
              질문
            </MenuButton>
            <MenuButton
              active={activeMenu === "답변"}
              onClick={() => setActiveMenu("답변")}
            >
              답변
            </MenuButton>
          </Menu>
          {activeMenu === "질문" ? <QuestionSection /> : <AnswerSection />}
        </QNAContainer>
        <LogoutButtonWrapper>
          <Button onClick={handleLogout} gray>
            Log out
          </Button>
        </LogoutButtonWrapper>
      </Wrapper>
    </>
  );
}

export default Profile;

// 스타일 컴포넌트 정의
const QNAContainer = styled.div``;

const Menu = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 57px;
  gap: 16px;
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 10px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 2px solid transparent;

  ${(props) =>
    props.active &&
    `
      color: #FFD0E1; /* 핑크색 포인트로 변경 */
      border-bottom: 2px solid #FFD0E1; /* 핑크색 하단 보더로 변경 */
    `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 100px;
`;

const ProfileImage = styled.div`
  background-color: ${(props) => getBackgroundColor(props.id)};
  border-radius: 50%;
  width: 129px;
  height: 129px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
`;

const UserName = styled.h2`
  font-size: 24px;
  color: #333;
`;

const UserBio = styled.p`
  font-size: 20px;
  color: #666;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin-bottom: 84px;
  margin-top: 25px;
`;

const LogoutButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
