import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userAPIs";
import LogoImg from "../assets/Logo.jpeg";

export default function LoginPage() {
  // 로그인 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // 로그인 요청 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setError(null); // 기존 에러 메시지 초기화
    try {
      const data = await login(email, password);

      // 로그인 성공 시 로컬 스토리지에 토큰 저장
      localStorage.setItem("token", data.token);

      // 로그인 성공 시 홈화면으로 새로고침하며 이동
      window.location.href = "/";

      console.log("Login successful!", data);
    } catch (err) {
      setError(err); // 에러 메시지를 상태로 설정
    }
  };

  return (
    <div className="flex min-h-full p-20 justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <img
            alt="Logo"
            src={LogoImg}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-xl font-bold text-white">Sign in</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-gray-300 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border-gray-300 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Not a member?{" "}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300">
            Sign Up ➡
          </a>
        </p>
      </div>
    </div>
  );
}
