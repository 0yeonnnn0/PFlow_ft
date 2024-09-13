import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/MainPage";
import { Helmet } from "react-helmet";
import StepByStepSignUpForm from "./pages/SignUpPage";
import MainScreen from "./pages/HomePage";
import { useState, useEffect } from "react";
import LoginSuccessPage from "./pages/LoginSuccessPage";
import { getProfile } from "./services/userAPIs";
import MyPage from "./pages/Mypage";
import AllProjects from "./pages/AllProjects";
import ResultPage from "./pages/ResultPage";

function App() {
  const navigate = useNavigate();

  // 로그인 상태 및 유저 데이터 관리
  let [userData, setUserData] = useState({
    _id: "",
    email: "",
    username: "",
  });

  // 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUserData = JSON.parse(localStorage.getItem("userData"));

    // 로컬 스토리지에 사용자 정보가 없으면 서버에서 불러오기
    if (!localUserData) {
      getProfile()
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          if (err === "Unauthorized" || err === "Token expired") {
            // 토큰이 만료된 경우 처리
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate("/login");
          } else {
            console.error(err);
          }
        });
    } else {
      // 로컬 스토리지에 사용자 정보가 있으면 불러오기
      setUserData({
        _id: localUserData._id,
        email: localUserData.email,
        username: localUserData.username,
      });
    }
  }, [navigate]);

  // 유저 데이터 불러오기
  useEffect(() => {
    const storedUserToken = localStorage.getItem("token");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserToken && !storedUserData) {
      return;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>Trust.</title>
      </Helmet>

      <Header userData={userData} />

      <div className="h-full">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* AllProjects 페이지 */}
          <Route path="/results" element={<ResultPage />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/project/:id" element={<MainScreen />} />

          {/* // 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          {/* // 회원가입 페이지 */}
          <Route
            path="/signup"
            element={<StepByStepSignUpForm setUserData={setUserData} />}
          />
          {/* // 회원가입 성공 시 화면 */}
          <Route
            path="/signupsuccess"
            element={<LoginSuccessPage userData={userData} />}
          />
          {/* // 마이페이지 */}
          <Route path="/user/:id" element={<MyPage userData={userData} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
