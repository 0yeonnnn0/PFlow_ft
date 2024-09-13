import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LButton } from "../components/LButton";

export default function LoginSuccessPage({ userData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, email } = userData || location.state || {};

  return (
    <div className="flex min-h-full p-20 justify-center bg-gray-900">
      <div className="w-full max-w-lg bg-gray-800 p-10 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">회원가입 성공!</h2>
        <p>로그인이 성공적으로 완료되었습니다.</p>
        <div className="mt-20 mb-10">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
        <LButton onClick={() => navigate("/")} contents={"홈으로"} />
      </div>
    </div>
  );
}
