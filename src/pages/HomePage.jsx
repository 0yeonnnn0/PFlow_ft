import React, { useEffect, useState } from "react";
import Step1 from "../components/progress/Step1";
import Step2 from "../components/progress/Step2";
import Step3 from "../components/progress/Step3";
import Step4 from "../components/progress/Step4";
import Step5 from "../components/progress/Step5";
import Step6 from "../components/progress/Step6";
import Step7 from "../components/progress/Step7";
import { getOneProject, updateProject } from "../services/projectAPIs";
import { useParams } from "react-router-dom";

const MainScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const projectId = useParams().id;
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    getOneProject(projectId)
      .then((data) => {
        setProjectData(data);
      })
      .catch((err) => {
        console.error("Failed to load project:", err);
      });
  }, [projectId]);

  // Function to handle the continue button click
  const handleContinue = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1); // Increment the current step
    }
  };

  // Function to handle circle click and jump to that step
  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  // Function to render the correct step component
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
      case 2:
        return (
          <Step2
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
      case 3:
        return (
          <Step3
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
      case 4:
        return (
          <Step4
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
      case 5:
        return (
          <Step5
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
      case 6:
        return (
          <Step6
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
      case 7:
        return (
          <Step7
            projectId={projectId}
            projectData={projectData}
            onContinue={handleContinue}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <button onClick={() => console.log(projectData)} className="bg-blue-200">
        asasfdf
      </button>
      {/* Left Side: Progress Circles with clickable functionality */}
      <div className="w-1/4 bg-gray-950 p-5 flex flex-col items-center">
        <h2 className="mb-5 text-lg">Progress</h2>
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div key={step} className="flex flex-col items-center">
              {/* Circle for each step */}
              <button
                onClick={() => handleStepClick(step)} // When a circle is clicked, jump to that step
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm transition-all duration-500 ease-in-out ${
                  currentStep >= step
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-gray-500"
                } animate-flow`}
              >
                {step}
              </button>

              {/* Line between circles (except after the last one) */}
              {step !== 7 && (
                <div
                  className={`h-10 w-1 ${
                    currentStep > step ? "bg-indigo-600" : "bg-gray-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Render each step component */}
      <div className="w-3/4 p-10">{renderStepComponent()}</div>
    </div>
  );
};

export default MainScreen;
