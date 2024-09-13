import React, { useEffect, useState } from "react";
import { updateProject } from "../../services/projectAPIs";

const Step2 = ({ projectId, projectData, onContinue }) => {
  const nowStep = 2; // 현재 스텝
  const [collaborationData, setCollaborationData] = useState({
    versionControl: "", // 버전 관리 도구 (예: GitHub 링크)
    communicationTools: [{ tool: "", url: "" }], // 소통 도구 목록
    projectManagementTools: [{ tool: "", url: "" }], // 프로젝트 관리 도구 목록
    designTool: "", // 디자인 도구 (예: Figma 링크)
  });

  // 상태 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollaborationData({
      ...collaborationData,
      [name]: value,
    });
  };

  // 소통 도구 정보 변경 핸들러
  const handleToolChange = (index, e, type) => {
    const { name, value } = e.target;
    const newTools = [...collaborationData[type]];
    newTools[index][name] = value;
    setCollaborationData({
      ...collaborationData,
      [type]: newTools,
    });
  };

  // 도구 추가 핸들러 (소통 도구/프로젝트 관리 도구)
  const handleAddTool = (type) => {
    setCollaborationData({
      ...collaborationData,
      [type]: [...collaborationData[type], { tool: "", url: "" }],
    });
  };

  // 도구 삭제 핸들러
  const handleRemoveTool = (index, type) => {
    const newTools = [...collaborationData[type]];
    newTools.splice(index, 1);
    setCollaborationData({
      ...collaborationData,
      [type]: newTools,
    });
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    onContinue(); // 다음 스텝으로 이동
    await updateProject(projectId, nowStep, collaborationData); // step2 데이터만 전송
  };

  useEffect(() => {
    if (projectData && projectData.step2) {
      setCollaborationData(projectData.step2);
    } else {
      // projectData.step2이 없을 때 기본값을 사용
      setCollaborationData({
        versionControl: "", // 버전 관리 도구 (예: GitHub 링크)
        communicationTools: [{ tool: "", url: "" }], // 소통 도구 목록
        projectManagementTools: [{ tool: "", url: "" }], // 프로젝트 관리 도구 목록
        designTool: "", // 디자인 도구 (예: Figma 링크)
      });
    }
  }, [projectData]);

  return (
    <div>
      <h1 className="text-2xl mb-5">Step 2: 협업 도구 설정</h1>

      <form onSubmit={handleSubmit}>
        {/* 버전 관리 도구 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">
            버전 관리 도구 (GitHub)
          </label>
          <input
            type="text"
            name="versionControl"
            placeholder="GitHub 링크를 입력하세요"
            className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={collaborationData.versionControl}
            onChange={handleChange}
          />
        </div>

        {/* 소통 도구 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">소통 도구</label>
          {collaborationData.communicationTools.map((tool, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                name="tool"
                placeholder={`도구 ${index + 1}`}
                className="p-3 w-1/3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={tool.tool}
                onChange={(e) =>
                  handleToolChange(index, e, "communicationTools")
                }
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className="p-3 w-2/3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={tool.url}
                onChange={(e) =>
                  handleToolChange(index, e, "communicationTools")
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveTool(index, "communicationTools")}
                className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-400"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddTool("communicationTools")}
            className="bg-indigo-600 px-4 py-2 mt-2 rounded-md hover:bg-indigo-500 transition-all text-white"
          >
            소통 도구 추가
          </button>
        </div>

        {/* 프로젝트 관리 도구 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">프로젝트 관리 도구</label>
          {collaborationData.projectManagementTools.map((tool, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                name="tool"
                placeholder={`도구 ${index + 1}`}
                className="p-3 w-1/3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={tool.tool}
                onChange={(e) =>
                  handleToolChange(index, e, "projectManagementTools")
                }
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className="p-3 w-2/3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={tool.url}
                onChange={(e) =>
                  handleToolChange(index, e, "projectManagementTools")
                }
              />
              <button
                type="button"
                onClick={() =>
                  handleRemoveTool(index, "projectManagementTools")
                }
                className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-400"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddTool("projectManagementTools")}
            className="bg-indigo-600 px-4 py-2 mt-2 rounded-md hover:bg-indigo-500 transition-all text-white"
          >
            프로젝트 관리 도구 추가
          </button>
        </div>

        {/* 디자인 도구 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">디자인 도구 (Figma)</label>
          <input
            type="text"
            name="designTool"
            placeholder="Figma 링크를 입력하세요"
            className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={collaborationData.designTool}
            onChange={handleChange}
          />
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

export default Step2;
