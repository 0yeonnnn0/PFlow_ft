import { useState } from "react";
import { updateProfile } from "../services/userAPIs";
import DummyProfile from "../assets/DummyProfile.jpeg";

export default function MyPage({ userData }) {
  const [username, setUsername] = useState(userData.username);
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    userData.profilePicture || DummyProfile
  );

  // 유저네임 변경 핸들러
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 프로필 사진 변경 핸들러
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl); // 새 프로필 이미지 미리보기
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    // 유저네임 변경 로직 추가
    console.log("Username changed to:", username);
    updateProfile(username);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직 추가
    console.log("Password changed to:", password);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">My Page</h1>

        {/* 프로필 사진 */}
        <div className="mb-6 text-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-4 text-center"
          />
        </div>

        {/* 사용자 정보 */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email:</label>
          <p className="bg-gray-700 p-2 rounded">{userData.email}</p>
        </div>

        {/* 유저네임 변경 */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="w-full bg-gray-700 p-2 rounded mt-1"
          />
          <button
            onClick={handleUsernameSubmit}
            className="w-full bg-indigo-600 p-2 rounded-lg mt-2 hover:bg-indigo-500 transition"
          >
            Change Username
          </button>
        </div>

        {/* 비밀번호 변경 */}
        <div className="mb-4">
          <label className="block text-sm font-medium">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full bg-gray-700 p-2 rounded mt-1"
            placeholder="Enter new password"
          />
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-indigo-600 p-2 rounded-lg mt-2 hover:bg-indigo-500 transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
