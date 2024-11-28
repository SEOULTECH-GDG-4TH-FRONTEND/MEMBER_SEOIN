import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Question from "./pages/Question";
import Profile from "./pages/Profile";
import Answer from "./pages/Answer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* 기본 경로에서 로그인 페이지로 리디렉션 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/main" element={<App />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
