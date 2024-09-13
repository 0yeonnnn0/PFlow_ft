import React, { useState } from "react";
import { updateProject } from "../../services/projectAPIs";

const Step6 = ({ projectId, projectData, onContinue }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const nowStep = 6; // 현재 스텝

  const steps = [
    "프론트엔드 프로토타입 만들기",
    "백엔드 프로토타입 만들기",
    "프론트-백엔드 통신",
    "개발 중...",
  ];

  // 단계 변경 핸들러
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleContinue = async () => {
    onContinue(); // 다음 스텝으로 이동
    await updateProject(projectId, nowStep);
  }

  return (
    <div className="p-8 bg-gray-900 text-white rounded-md">
      <h1 className="text-3xl mb-6 font-bold tracking-wide">
        Step 6: 개발 단계
      </h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-green-600 h-4 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-center text-gray-300">
          {steps.map((step, index) => (
            <span
              key={index}
              className={
                index + 1 === currentStep
                  ? "font-bold text-indigo-400"
                  : "text-gray-400"
              }
            >
              {step}
              {index < steps.length - 1 && " → "}
            </span>
          ))}
        </div>
      </div>

      {/* 단계별 화면 */}
      <div className="p-6 bg-gray-800 rounded-md">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl mb-4 font-semibold tracking-wide">
              프론트엔드 프로토타입 만들기
            </h2>
            <p>
              React, Vue, Angular 등 프론트엔드 기술을 선택하고 기본
              프로토타입을 만들어 보세요.
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl mb-4 font-semibold tracking-wide">
              백엔드 프로토타입 만들기
            </h2>
            <p>
              Express, Django, Flask 등의 백엔드 프레임워크를 선택해 서버를
              설정하고 간단한 API를 만들어 보세요.
            </p>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl mb-4 font-semibold tracking-wide">
              프론트-백엔드 통신
            </h2>
            <p>
              /api 경로로 GET 요청을 보내면 'hello world' 메시지를 반환하는
              간단한 통신을 구현해보세요.
            </p>
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-wide">개발 중...</h2>
            <p className="text-gray-300 mt-4 mb-6">
              현재 프로젝트가 개발 중입니다. 계속 작업을 진행하세요.
            </p>

            {/* Continue 버튼 */}
            <button
              type="submit"
              onClick={handleContinue}
              className="bg-indigo-600 px-5 py-3 rounded-md hover:bg-indigo-500 transition-all text-white"
            >
              Continue
            </button>
          </div>
        )}
      </div>

      {/* 이전/다음 버튼 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-md ${
            currentStep === 1
              ? "bg-gray-600"
              : "bg-indigo-600 hover:bg-indigo-500"
          } text-white`}
        >
          이전
        </button>
        <button
          onClick={handleNextStep}
          disabled={currentStep === steps.length}
          className={`px-4 py-2 rounded-md ${
            currentStep === steps.length
              ? "bg-gray-600"
              : "bg-indigo-600 hover:bg-indigo-500"
          } text-white`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step6;
