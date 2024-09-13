import React, { useEffect, useState } from "react";
import { updateProject } from "../../services/projectAPIs";

const Step1 = ({ projectId, projectData, onContinue }) => {
  const nowStep = 1; // 현재 스텝
  const step1Data = {
    projectName: "",
    teamName: "",
    framework: "",
    teamMembers: [{ name: "", role: "" }],
  };
  
  const [teamData, setTeamData] = useState(step1Data);
  const frameworks = ["React", "Vue", "Angular", "Next.js", "Svelte"];

  // 상태 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  // 팀원 정보 변경 핸들러
  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    const newTeamMembers = [...teamData.teamMembers];
    newTeamMembers[index][name] = value;
    setTeamData({
      ...teamData,
      teamMembers: newTeamMembers,
    });
  };

  // 팀원 추가 핸들러
  const handleAddTeamMember = () => {
    setTeamData({
      ...teamData,
      teamMembers: [...teamData.teamMembers, { name: "", role: "" }],
    });
  };

  // 팀원 삭제 핸들러 (필요 시 사용)
  const handleRemoveTeamMember = (index) => {
    const newTeamMembers = [...teamData.teamMembers];
    newTeamMembers.splice(index, 1);
    setTeamData({
      ...teamData,
      teamMembers: newTeamMembers,
    });
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    onContinue(); // 다음 스텝으로 이동
    console.log(teamData);
    await updateProject(projectId, nowStep, teamData); // step1 데이터만 전송
  };

  useEffect(() => {
    if (projectData && projectData.step1) {
      setTeamData(projectData.step1);
    } else {
      // projectData.step1이 없을 때 기본값을 사용
      setTeamData(step1Data);
    }
  }, [projectData]);

  return (
    <div>
      <h1 onClick={() => console.log(teamData)} className="text-2xl mb-5">
        Step 1: 프로젝트 설정
      </h1>

      <form onSubmit={handleSubmit}>
        {/* 프로젝트 명 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">프로젝트 명</label>
          <input
            type="text"
            name="projectName"
            placeholder="프로젝트 명을 입력하세요"
            className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={teamData.projectName}
            onChange={handleChange}
          />
        </div>

        {/* 팀 명 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">팀 명</label>
          <input
            type="text"
            name="teamName"
            placeholder="팀 명을 입력하세요"
            className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={teamData.teamName}
            onChange={handleChange}
          />
        </div>

        {/* 프레임워크 선택 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">프레임워크 선택</label>
          <select
            name="framework"
            className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={teamData.framework}
            onChange={handleChange}
          >
            <option value="" disabled>
              프레임워크를 선택하세요
            </option>
            {frameworks?.map((fw) => (
              <option key={fw} value={fw}>
                {fw}
              </option>
            ))}
          </select>
        </div>

        {/* 팀원 추가 */}
        <div className="mb-5">
          <label className="block mb-2 text-white">팀원</label>
          {teamData.teamMembers.map((member, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              {/* 팀원 이름 필드 (1:3 비율로 설정) */}
              <input
                type="text"
                name="name"
                placeholder={`팀원 ${index + 1} 이름`}
                className="p-3 w-1/3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(index, e)}
              />
              {/* 역할 필드 (3:4 비율로 설정) */}
              <input
                type="text"
                name="role"
                placeholder="역할"
                className="p-3 w-2/3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={member.role}
                onChange={(e) => handleTeamMemberChange(index, e)}
              />
              {/* 팀원 삭제 버튼 (선택 사항) */}
              <button
                type="button"
                onClick={() => handleRemoveTeamMember(index)}
                className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-400"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTeamMember}
            className="bg-indigo-600 px-4 py-2 mt-2 rounded-md hover:bg-indigo-500 transition-all text-white"
          >
            팀원 추가
          </button>
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

export default Step1;
