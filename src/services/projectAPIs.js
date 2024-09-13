import axios from "axios";

const API_URL = "http://localhost:8080"; // 백엔드 API URL

//프로젝트 생성
export const createProject = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/services`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const updateProject = async (projectId, currentStep, stepData) => {
  try {
    // stepData는 현재 스텝에서 입력된 데이터를 의미
    const response = await axios.put(
      `${API_URL}/api/services/${projectId}`,
      {
        currentStep, // 현재 진행중인 스텝을 전달
        stepData: { ...stepData }, // 해당 스텝의 데이터를 전송 (step1, step2 등)
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "프로젝트 업데이트 실패";
  }
};

//프로젝트 정보 받아오기
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/services`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

//프로젝트 정보 받아오기
export const getFinProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/services/completed`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

//프로젝트 단일 정보 받아오기
export const getOneProject = async (projectId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/services/${projectId}`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

//프로젝트 삭제
export const delProject = async (projectId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/services/${projectId}`,
      {
        //   headers: {
        //     Authorization: `${localStorage.getItem("token")}`,
        //   },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
