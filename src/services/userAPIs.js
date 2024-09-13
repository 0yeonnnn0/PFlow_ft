import axios from "axios";

const API_URL = "http://localhost:8080"; // 백엔드 API URL

// 프로필 정보-비밀번호 수정
export const updatePassword = async (password) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/users/password`,
      { password: password },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    localStorage.removeItem("userData");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

//프로필 정보-닉네임 수정
export const updateProfile = async (username) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/users/username`,
      { username: username },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    localStorage.removeItem("userData");
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// 프로필 정보 받아오기
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
    return response.data; // 로그인 성공 시 데이터 반환
  } catch (error) {
    throw error.response.data.message; // 에러 처리
  }
};

export const register = async (email, password, username) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
      username,
    });
    return response.data; // 회원가입 성공 시 데이터 반환
  } catch (error) {
    throw error.response.data.message; // 에러 처리
  }
};
