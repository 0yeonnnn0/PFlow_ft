import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../../services/projectAPIs";

const Step7 = ({ projectId, projectData }) => {
  const [finalUrl, setFinalUrl] = useState({ finalProductUrl: "" });
  const nowStep = 7; // 현재 스텝
  const navigate = useNavigate();

  const handleUrlChange = (e) => {
    const { value } = e.target;
    setFinalUrl({ finalProductUrl: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProject(projectId, nowStep, finalUrl); // step7 데이터만 전송
    navigate("/results");
  };

  useEffect(() => {
    if (projectData && projectData.step7) {
      setFinalUrl(projectData.step7);
    } else {
      // projectData.step7이 없을 때 기본값을 사용
      setFinalUrl({ finalProductUrl: "" });
    }
  }, [projectData]);

  return (
    <div className="p-8 bg-gray-900 text-white rounded-md">
      <h1 className="text-3xl mb-6 font-bold tracking-wide">
        Step 7: 최종 결과물과 README 작성
      </h1>

      {/* 최종 URL 입력 */}
      <div className="mb-8">
        <label className="block text-xl mb-2 text-white">
          최종 결과물 URL을 입력하세요:
        </label>
        <input
          type="url"
          placeholder="https://example.com"
          value={finalUrl.finalProductUrl}
          onChange={handleUrlChange}
          className="w-full p-4 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
      </div>

      {/* README 예시 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">README 작성 도움말</h2>
        <p className="text-gray-300 mb-4">
          좋은 README 파일은 프로젝트의 핵심 정보와 사용법을 명확하게 설명해야
          합니다. 아래는 예시입니다:
        </p>
        <pre className="p-4 bg-gray-800 rounded-md text-sm text-gray-300 overflow-x-auto">
          <code>
            {`# Project Title

## Description
A brief description of what your project does and who it's for.

## Installation
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/your-project.git
   \`\`\`
2. Navigate into the project directory:
   \`\`\`bash
   cd your-project
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## Usage
1. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
2. Open your browser and visit \`http://localhost:3000\`.

## Contributing
Contributions are welcome! Please follow the guidelines in the CONTRIBUTING.md file.

## License
This project is licensed under the MIT License. See the LICENSE file for details.`}
          </code>
        </pre>
      </div>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 px-5 py-3 rounded-md hover:bg-indigo-500 transition-all text-white"
      >
        완료
      </button>
    </div>
  );
};

export default Step7;
