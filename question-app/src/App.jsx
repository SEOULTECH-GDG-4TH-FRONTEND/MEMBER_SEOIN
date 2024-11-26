import "./App.css";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import ProfileCard from "./components/ProfileCard";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUsers } from "./apis/user";

// 전체 페이지 래퍼
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 85px;
`;

// 제목 스타일링
const Title = styled.div`
  font-size: 32px;
  color: #333;
  font-weight: 700;
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-radius: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 24px; /* 물음표 이모지 크기 */
  }
`;

// 카드 리스트 래퍼
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

function App() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllUsers();
        setProfiles(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>🙋🏻 누구에게 질문할까요⁉️</Title>
        <CardWrapper>
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              id={profile.id}
              name={profile.username}
              bio={profile.bio}
              questionCount={profile.receivedQuestionCount}
              onClick={() =>
                navigate("/question", {
                  state: { user: profile },
                })
              }
            />
          ))}
        </CardWrapper>
      </Wrapper>
    </>
  );
}

export default App;
