import React, { useEffect, useState } from "react";
import { updateProject } from "../../services/projectAPIs";

const Step5 = ({ projectId, projectData, onContinue }) => {
  const nowStep = 5; // 현재 스텝
  const step5Data = { erdLink: "" };
  const [erdLink, setErdLink] = useState(step5Data);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setErdLink({ erdLink: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onContinue(); // 다음 스텝으로 이동
    await updateProject(projectId, nowStep, erdLink);
  };
  useEffect(() => {
    if (projectData && projectData.step5) {
      setErdLink(projectData.step5);
    } else {
      // projectData.step1이 없을 때 기본값을 사용
      setErdLink(step5Data);
    }
  }, [projectData]);

  return (
    <div className="p-8 bg-gray-900 text-white rounded-md">
      <h1 className="text-3xl mb-6 font-bold tracking-wide">
        Step 5: 데이터베이스 정리
      </h1>

      <div className="mb-8 p-6 bg-gray-800 rounded-md">
        <h2 className="text-xl mb-4 font-semibold tracking-wide">
          ERD 링크 입력
        </h2>
        <p className="text-gray-300 mb-4">
          ERD를 작성한 사이트의 링크를 아래에 입력해주세요.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://example.com/erd"
            value={erdLink.erdLink}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 px-5 py-3 rounded-md hover:bg-indigo-500 transition-all text-white"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step5;
