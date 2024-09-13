import React from "react";

const Step4 = ({ onContinue }) => {
  return (
    <div className="p-8 bg-gray-900 text-white rounded-md">
      <h1 className="text-3xl mb-6 font-bold tracking-wide">
        Step 4: 디자인 팁
      </h1>

      {/* 디자인 팁 제공 */}
      <div className="mb-8 p-6 bg-gray-800 rounded-md">
        <h2 className="text-2xl mb-4 font-semibold tracking-wide">
          디자인에 대한 몇 가지 팁
        </h2>
        <ul className="list-disc pl-6 text-gray-300 leading-relaxed space-y-4">
          <li>
            디자인의 일관성을 유지하세요. 폰트, 컬러, 버튼 스타일 등을 통일하는
            것이 중요합니다.
          </li>
          <li>
            간결한 레이아웃을 유지하세요. 복잡한 요소들은 사용자의 혼란을 유발할
            수 있습니다.
          </li>
          <li>
            모바일과 데스크톱 환경 모두를 고려한 반응형 디자인을 구현하세요.
          </li>
          <li>
            사용자 경험(UX)을 고려한 흐름을 설계하세요. 사용자가 쉽게 이해하고
            사용할 수 있도록 만드세요.
          </li>
        </ul>
      </div>

      {/* 다음으로 넘어가기 (continue) 버튼 */}
      <button
        onClick={onContinue}
        className="bg-indigo-600 px-5 py-3 rounded-md hover:bg-indigo-500 transition-all text-white"
      >
        Continue
      </button>
    </div>
  );
};

export default Step4;
