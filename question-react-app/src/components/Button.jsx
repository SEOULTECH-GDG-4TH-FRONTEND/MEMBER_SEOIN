import styled from "styled-components";

// 기본 스타일 (핑크색 버튼)
const StyledButton = styled.button`
  padding: 15px;
  font-size: 1.2rem; /* 글씨 크기 증가 */
  font-weight: bold; /* 글씨 굵기 */
  color: white;
  background-color: #e4a4b3; /* 기본 배경색: 핑크 */
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d38aa2; /* hover 시 진한 핑크 */
  }
`;

// 초록색 버튼 스타일 확장
const GreenButton = styled(StyledButton)`
  background-color: #b4d1a7; /* 초록색 */
  &:hover {
    background-color: #4caf50; /* hover 시 진한 초록색 */
  }
`;

// 회색 버튼 스타일 확장
const GrayButton = styled(StyledButton)`
  background-color: #b0b0b0; /* 회색 */
  &:hover {
    background-color: #888888; /* hover 시 진한 회색 */
  }
`;

// 컴포넌트 정의
function Button({ children, onClick, green, gray }) {
  if (green) {
    // 초록색 버튼을 사용하는 경우
    return <GreenButton onClick={onClick}>{children}</GreenButton>;
  }
  if (gray) {
    // 회색 버튼을 사용하는 경우
    return <GrayButton onClick={onClick}>{children}</GrayButton>;
  }
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
