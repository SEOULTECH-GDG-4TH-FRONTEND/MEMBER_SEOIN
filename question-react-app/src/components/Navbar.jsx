import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/Arrow_back.svg"; // 로고 경로 설정

function Navbar() {
  const navigate = useNavigate(); // 이전 페이지로 이동

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate(-1)}>
        <img src={logo} alt="Logo" />
      </Logo>
      <ProfileButton>
        <Link to="/profile" style={{ color: "black", textDecoration: "none" }}>
          Profile
        </Link>
      </ProfileButton>
    </NavbarContainer>
  );
}

export default Navbar;

// 스타일 컴포넌트
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6vh; /* 네비게이션 바 높이 */
  backdrop-filter: blur(2px); /* 블러 효과 */
  background-color: rgba(180, 209, 167, 0.5); /* 반투명 흰색 */
  padding: 0 20px;
  z-index: 1000; /* 상단 고정 */
`;

const Logo = styled.div`
  display: flex;
  align-items: center; /* 로고를 수직 가운데 정렬 */
  height: 100%; /* 부모의 높이를 기준으로 가운데 정렬 */
  cursor: pointer;

  img {
    height: 45px; /* 로고 높이 */
    width: auto; /* 비율에 맞게 너비 조정 */
    filter: brightness(0) invert(1); /* 색상을 흰색으로 변환 */
  }
`;

const ProfileButton = styled.div`
  background-color: white;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  padding: 7px 15px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
