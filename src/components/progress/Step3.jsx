import React, { useEffect, useState } from "react";
import { updateProject } from "../../services/projectAPIs";

const Step3 = ({ projectId, projectData, onContinue }) => {
  const nowStep = 3; // 현재 스텝
  const step3DummyData = {
    codeConvention: {
      variableNaming: "",
      functionNaming: "",
      indentation: "",
    },
    githubConvention: {
      commitMessage: "",
      branchNaming: "",
    },
    fileStructureConvention: "",
    fileNameConvention: "",
  };
  const [step3Data, setStep3Data] = useState(step3DummyData);

  // 상태 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    if (field) {
      setStep3Data((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else {
      setStep3Data((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [selectedStructure, setSelectedStructure] = useState("");

  const handleSelectChange = (e) => {
    setSelectedStructure(e.target.value);
  };

  // 파일 구조 설명과 예시 데이터
  const structureData = {
    frontend: {
      description:
        "프론트엔드 프로젝트에서는 주로 컴포넌트 기반으로 구성되며, 각 기능별로 컴포넌트를 나누고 API 호출이나 스타일 파일을 관리하는 구조입니다.",
      example: `
src/
├── components/
│   ├── Button.js
│   └── Header.js
├── pages/
│   ├── Home.js
│   └── Login.js
├── services/
│   └── api.js
├── assets/
│   └── logo.png
├── App.js
├── index.js
└── styles.css
`,
    },
    backend: {
      description:
        "백엔드 프로젝트는 주로 서버와 데이터베이스를 다루며, 컨트롤러, 라우트, 모델, 미들웨어 등을 관리하는 구조입니다.",
      example: `
src/
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── models/
│   └── User.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── app.js
└── server.js
`,
    },
    fullstack: {
      description:
        "풀스택 프로젝트는 프론트엔드와 백엔드를 모두 포함하며, 클라이언트와 서버를 분리하여 관리합니다.",
      example: `
project-root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   ├── public/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── app.js
│   └── server.js
├── README.md
├── package.json
└── .gitignore
`,
    },
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    onContinue(); // 다음 스텝으로 이동
    await updateProject(projectId, nowStep, step3Data); // step2 데이터만 전송
  };

  useEffect(() => {
    if (projectData && projectData.step3) {
      setStep3Data(projectData.step3);
    } else {
      // projectData.step1이 없을 때 기본값을 사용
      setStep3Data(step3DummyData);
    }
  }, [projectData]);

  return (
    <div>
      <h1 className="text-2xl mb-5">Step 3: 컨벤션 설정</h1>

      <form onSubmit={handleSubmit}>
        {/* 코드 컨벤션 */}
        <div className="mb-5 p-4 border border-gray-500 rounded-md">
          <h2 className="text-xl mb-3 text-white">코드 컨벤션</h2>

          {/* 변수 명 규칙 */}
          <div className="mb-4">
            <label className="block mb-2 text-white">변수 명 규칙</label>
            <div className="space-y-2">
              {" "}
              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.variableNaming"
                    value="camelCase"
                    checked={
                      step3Data.codeConvention.variableNaming === "camelCase"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>camelCase</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  첫 글자는 소문자, 이후의 각 단어의 첫 글자는 대문자. 예:{" "}
                  <code>myVariableName</code>
                </p>
              </div>
              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.variableNaming"
                    value="PascalCase"
                    checked={
                      step3Data.codeConvention.variableNaming === "PascalCase"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>PascalCase</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  모든 단어의 첫 글자가 대문자. 예: <code>MyVariableName</code>
                </p>
              </div>
              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.variableNaming"
                    value="snake_case"
                    checked={
                      step3Data.codeConvention.variableNaming === "snake_case"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>snake_case</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  단어 사이를 언더스코어(_)로 구분하고 모두 소문자. 예:{" "}
                  <code>my_variable_name</code>
                </p>
              </div>
            </div>
          </div>

          {/* 함수 명 규칙 */}
          <div className="mb-4">
            <label className="block mb-2 text-white">함수 명 규칙</label>
            <div className="space-y-2">
              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.functionNaming"
                    value="camelCase"
                    checked={
                      step3Data.codeConvention.functionNaming === "camelCase"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>camelCase</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  함수 이름의 첫 글자는 소문자, 이후 각 단어의 첫 글자는 대문자.
                  예: <code>myFunctionName</code>
                </p>
              </div>

              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.functionNaming"
                    value="PascalCase"
                    checked={
                      step3Data.codeConvention.functionNaming === "PascalCase"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>PascalCase</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  모든 단어의 첫 글자가 대문자. 예: <code>MyFunctionName</code>
                </p>
              </div>

              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.functionNaming"
                    value="snake_case"
                    checked={
                      step3Data.codeConvention.functionNaming === "snake_case"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>snake_case</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  단어 사이를 언더스코어(_)로 구분하고 모두 소문자. 예:{" "}
                  <code>my_function_name</code>
                </p>
              </div>
            </div>
          </div>

          {/* 들여쓰기 규칙 */}
          <div className="mb-4">
            <label className="block mb-2 text-white">들여쓰기 규칙</label>
            <input
              type="text"
              name="codeConvention.indentation"
              placeholder="예: 2 spaces"
              className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={step3Data.codeConvention.indentation}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* GitHub 컨벤션 */}
        <div className="mb-5 p-4 border border-gray-500 rounded-md">
          <h2 className="text-xl mb-3 text-white">GitHub 컨벤션</h2>

          {/* 커밋 메시지 규칙 */}
          <div className="mb-3">
            <label className="block mb-2 text-white">커밋 메시지 규칙</label>
            <div className="bg-gray-800 p-4 rounded-md text-white">
              {/* 여기에 커밋 메시지 규칙 설명을 작성하세요 */}
              <p>
                커밋 메시지는 짧고 명확해야 하며, 무엇을 변경했는지 설명해야
                합니다.
              </p>
            </div>
          </div>

          {/* 커밋 메시지 예시 */}
          <div className="mb-3">
            <div className="bg-gray-800 p-4 rounded-md text-white">
              <pre className="text-sm text-gray-400">
                <code>
                  {/* 예시 코드 작성 공간 */}
                  feat: add login feature{"\n"}
                  fix: 잘못된 비밀번호 입력 시 에러 처리{"\n"}
                  refactor: improve code structure
                </code>
              </pre>
            </div>
          </div>

          {/* 브랜치 이름 규칙 */}
          <div className="mb-3">
            <label className="block mb-2 text-white">브랜치 이름 규칙</label>
            <div className="bg-gray-800 p-4 rounded-md text-white">
              {/* 여기에 브랜치 이름 규칙 설명을 작성하세요 */}
              <p>기능별로 브랜치를 나누고, 의미 있는 이름을 사용합니다.</p>
            </div>
          </div>

          {/* 브랜치 이름 예시 */}
          <div className="mb-3">
            <div className="bg-gray-800 p-4 rounded-md text-white">
              <pre className="text-sm text-gray-400">
                <code>
                  {/* 예시 코드 작성 공간 */}
                  feature/login-function{"\n"}
                  bugfix/login-error{"\n"}
                  hotfix/critical-issue
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* 파일 구조 컨벤션 */}
        <div className="flex">
          {/* 왼쪽: 파일 구조 선택 */}
          <div className="w-1/3 p-4">
            <label className="block mb-2 text-white">
              파일 구조를 선택하세요:
            </label>
            <select
              value={selectedStructure}
              onChange={handleSelectChange}
              className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">선택하세요</option>
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="fullstack">풀스택</option>
            </select>

            {/* 파일 구조 설명 */}
            {selectedStructure && (
              <div className="mt-5">
                <h3 className="text-lg text-white mb-2">설명:</h3>
                <p className="text-gray-300">
                  {structureData[selectedStructure].description}
                </p>
              </div>
            )}
          </div>

          {/* 오른쪽: 파일 구조 예시 */}
          <div className="w-2/3 p-4">
            {selectedStructure && (
              <div className="mt-5 bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg text-white mb-2">파일 구조 예시:</h3>
                <pre className="text-sm text-gray-400">
                  <code>{structureData[selectedStructure].example}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* 파일 명 컨벤션 */}
        <div className="mb-5 border border-gray-500 rounded-md">
          <h2 className="text-xl mb-3 text-white">파일 명 규칙</h2>
          <div className="mb-4">
            <div className="space-y-2">
              {" "}
              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.variableNaming"
                    value="PascalCase"
                    checked={
                      step3Data.codeConvention.variableNaming === "PascalCase"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>PascalCase</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  특정 프레임워크에서는 파스칼 케이스로 시작하는 파일 이름을
                  선호하기도 합니다. (특히 React에서는 컴포넌트 파일)
                  <br /> 예: <code>UserProfile.js, HomePage.js</code>
                </p>
              </div>
              <div className="p-3 border border-gray-600 rounded-md">
                <label className="text-white">
                  <input
                    type="radio"
                    name="codeConvention.variableNaming"
                    value="snake_case"
                    checked={
                      step3Data.codeConvention.variableNaming === "snake_case"
                    }
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <strong>snake_case</strong>
                </label>
                <p className="text-gray-400 text-sm mt-2 pl-6">
                  대부분의 언어에서 파일 이름은 소문자와 언더스코어(_)를
                  사용하는 것이 일반적입니다.
                  <br />
                  예: <code>user_profile.js, login_page.py</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 주석 컨벤션 */}
        <div className="mb-5">
          <h2 className="text-xl mb-3 text-white">주석 컨벤션</h2>
          <div className="bg-gray-800 p-4 rounded-md text-white">
            코드는 누구나 이해할 수 있게 주석을 달아야 합니다.
          </div>

          <div className="my-3">
            <label className="block mb-2 text-white">단일 주석</label>
            <div className="bg-gray-800 p-4 rounded-md text-white">
              <p>코드 내 중요한 부분에 간단한 설명을 추가합니다.</p>
            </div>
          </div>

          {/* 단일 주석 예시 */}
          <div className="mb-3">
            <div className="bg-gray-800 p-4 rounded-md text-white">
              <pre className="text-sm text-gray-400">
                <code>
                  {`{/* 사용자의 나이를 출력하는 함수 */}
function printUserAge(age) {
    console.log(age);
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="my-3">
          <label className="block mb-2 text-white">블록 주석</label>
          <div className="bg-gray-800 p-4 rounded-md text-white">
            <p>더 긴 설명이 필요한 경우 사용합니다.</p>
          </div>
        </div>

        {/* 블록 주석 예시 */}
        <div className="mb-3">
          <div className="bg-gray-800 p-4 rounded-md text-white">
            <pre className="text-sm text-gray-400">
              <code>
                {`/*
 * 이 함수는 사용자의 나이를 받아서
 * 콘솔에 출력합니다.
 */
function printUserAge(age) {
    console.log(age);
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* 계속 버튼 */}
        <button
          type="submit"
          className="bg-indigo-600 px-5 py-3 rounded-md hover:bg-indigo-500 transition-all text-white"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Step3;
