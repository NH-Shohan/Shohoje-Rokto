"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const Stepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  if (stepsConfig.length === 0) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentStep((nextStep) => {
      if (nextStep === stepsConfig[0]) {
        setIsComplete(false);
        return nextStep;
      } else {
        return nextStep - 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="relative flex justify-center">
        <div className="flex justify-between my-10 w-[480px]">
          {stepsConfig.map((step, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <div
                className={`bg-accent w-12 h-12 text-xl flex justify-center items-center rounded-full mb-2 border-[4px] border-background ${
                  currentStep > index + 1 || isComplete
                    ? "bg-green-600 text-white"
                    : ""
                } ${currentStep === index + 1 ? "bg-primary text-white" : ""}`}
              >
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div
                className={`${
                  currentStep > index + 1 || isComplete ? "text-green-600" : ""
                } ${currentStep === index + 1 ? "text-primary" : ""}`}
              >
                {step.name}
              </div>
            </div>
          ))}
        </div>
        <Progress
          className="absolute top-[62px] w-[350px] -z-10"
          value={calculateProgressBarWidth()}
        />
      </div>

      <ActiveComponent />

      <div className="flex gap-4 mt-5">
        {!isComplete && (
          <>
            {currentStep !== 1 && (
              <Button onClick={handlePrev} className="w-1/5">
                {stepsConfig.length === currentStep ? "Previous" : "Previous"}
              </Button>
            )}

            {currentStep !== stepsConfig.length && (
              <Button onClick={handleNext} className="w-1/5">
                {stepsConfig.length === currentStep ? "Finish" : "Next"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Stepper;
