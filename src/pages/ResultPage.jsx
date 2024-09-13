import { useEffect, useState } from "react";
import { getFinProjects } from "../services/projectAPIs";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const [completedProjects, setCompletedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 프로젝트 데이터를 불러오는 함수
    getFinProjects()
      .then((data) => {
        // 완료된 프로젝트만 필터링
        const filteredProjects = data.filter(
          (project) => project.currentStep === 7
        );
        setCompletedProjects(filteredProjects);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
      });
  }, []);

  // PDF 생성 함수
  const generatePDF = (project) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="font-size: 28px; margin-bottom: 20px; text-align: center;">${
          project?.step1?.projectName || "프로젝트 이름 없음"
        }</h1>
  
        <!-- Step 1: 팀 정보 설정 -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">팀 이름:</strong>
          <p style="font-size: 16px; margin-top: 5px;">${
            project?.step1?.teamName || "팀 이름 없음"
          }</p>
        </div>
  
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">프레임워크:</strong>
          <p style="font-size: 16px; margin-top: 5px;">${
            // project?.step1?.framework || "프레임워크 없음"
            "React"
          }</p>
        </div>
  
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">팀 멤버:</strong>
          <ul style="font-size: 16px; margin-top: 5px;">
            ${
              project?.step1?.teamMembers
                ? project.step1.teamMembers
                    .map(
                      (member) =>
                        `<li style="margin-bottom: 5px;">${
                          member.name || "이름 없음"
                        } - ${member.role || "역할 없음"}</li>`
                    )
                    .join("")
                : "<li>팀 멤버 없음</li>"
            }
          </ul>
        </div>
  
        <!-- Step 2: 프로젝트 협업 도구 설정 -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">버전 관리:</strong>
          <p style="font-size: 16px; margin-top: 5px; word-break: break-all;">
            <a href="${project?.step2?.versionControl || "#"}">${
      project?.step2?.versionControl || "버전 관리 정보 없음"
    }</a>
          </p>
        </div>
  
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">소통 도구:</strong>
          <ul style="font-size: 16px; margin-top: 5px;">
            ${
              project?.step2?.communicationTools
                ? project.step2.communicationTools
                    .map(
                      (tool) =>
                        `<li style="margin-bottom: 5px;">${
                          tool.tool || "도구 없음"
                        }: <a href="${tool.url || "#"}">${
                          tool.url || "링크 없음"
                        }</a></li>`
                    )
                    .join("")
                : "<li>소통 도구 없음</li>"
            }
          </ul>
        </div>
  
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">프로젝트 관리 도구:</strong>
          <ul style="font-size: 16px; margin-top: 5px;">
            ${
              project?.step2?.projectManagementTools
                ? project.step2.projectManagementTools
                    .map(
                      (tool) =>
                        `<li style="margin-bottom: 5px;">${
                          tool.tool || "도구 없음"
                        }: <a href="${tool.url || "#"}">${
                          tool.url || "링크 없음"
                        }</a></li>`
                    )
                    .join("")
                : "<li>프로젝트 관리 도구 없음</li>"
            }
          </ul>
        </div>
  
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">디자인 도구:</strong>
          <p style="font-size: 16px; margin-top: 5px; word-break: break-all;">
            <a href="${project?.step2?.designTool || "#"}">${
      project?.step2?.designTool || "디자인 도구 정보 없음"
    }</a>
          </p>
        </div>
  
        <!-- Step 3: 코드 및 GitHub 컨벤션 설정 -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">코드 컨벤션:</strong>
          <p style="font-size: 16px; margin-top: 5px;">변수 명명 규칙: ${
            project?.step3?.codeConvention?.variableNaming || "정보 없음"
          }</p>
          <p style="font-size: 16px; margin-top: 5px;">함수 명명 규칙: ${
            project?.step3?.codeConvention?.functionNaming || "정보 없음"
          }</p>
          <p style="font-size: 16px; margin-top: 5px;">들여쓰기: ${
            project?.step3?.codeConvention?.indentation || "정보 없음"
          } spaces</p>
        </div>
  
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">GitHub 컨벤션:</strong>
          <p style="font-size: 16px; margin-top: 5px;">커밋 메시지 규칙: ${
            project?.step3?.githubConvention?.commitMessage || "정보 없음"
          }</p>
          <p style="font-size: 16px; margin-top: 5px;">브랜치 명명 규칙: ${
            project?.step3?.githubConvention?.branchNaming || "정보 없음"
          }</p>
        </div>
  
        <!-- Step 5: 데이터베이스 및 ERD 설정 -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">ERD 링크:</strong>
          <p style="font-size: 16px; margin-top: 5px; word-break: break-all;">
            <a href="${project?.step5?.erdLink || "#"}">${
      project?.step5?.erdLink || "ERD 정보 없음"
    }</a>
          </p>
        </div>
  
        <!-- Step 7: 최종 결과물 및 README 작성 -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <strong style="font-size: 18px;">최종 제품 URL:</strong>
          <p style="font-size: 16px; margin-top: 5px; word-break: break-all;">
            <a href="${project?.step7?.finalProductUrl || "#"}">${
      project?.step7?.finalProductUrl || "최종 제품 정보 없음"
    }</a>
          </p>
        </div>
      </div>
    `;

    const opt = {
      margin: 1,
      filename: `${project?.step1?.projectName || "project"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Completed Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {completedProjects.length > 0 ? (
          completedProjects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 border border-gray-700 rounded-lg relative"
            >
              {/* 프로젝트 제목을 클릭하면 프로젝트 페이지로 이동 */}
              <h2
                className="text-xl font-bold cursor-pointer hover:underline"
                onClick={() => navigate(`/project/${project._id}`)}
              >
                {project?.step1?.projectName || "프로젝트 이름 없음"}
              </h2>

              {/* 프로젝트 단계별 데이터를 렌더링 */}
              <p>
                <strong>최종 제품 URL:</strong>{" "}
                {/* //a태그 누르면 새 창으로 이동 */}
                <a
                  href={project?.step7?.finalProductUrl || "#"}
                  target="_blank"
                >
                  {project?.step7?.finalProductUrl || "최종 제품 정보 없음"}
                </a>
              </p>

              {/* 우측 하단의 버튼들 */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => generatePDF(project)}
                  className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  PDF로 변환
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>완료된 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
