import React, { useEffect, useState } from "react";

const ProgressBar = ({ totalStages, currentStage, setCurrentStage }) => {

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const progress =
      currentStage === 1 ? 0 : ((currentStage - 1) / (totalStages - 1)) * 100;
    setProgressPercentage(progress);
  }, [currentStage]);

  return (
    <div className="relative w-fit mx-auto  h-12   flex items-center  ">
      {/* ------progress numbers------- */}
      <div className="relative z-[10] flex items-center center gap-10 ">
        {[...Array(totalStages)].map((_, idx) => {
          const stage = idx + 1;
          return (
            <span
              key={idx}
              onClick={() => setCurrentStage(stage)}
              className={`w-10 h-10 rounded-full border ${
                currentStage === stage
                  ? "border-primary text-white bg-primary"
                  : "border-gray-500 text-gray-500 bg-white"
              }  flex items-center justify-center font-medium text-lg cursor-pointer transition-all duration-300 ease-in-out`}
            >
              {stage}
            </span>
          );
        })}
      </div>

      {/* ------progress line------- */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-gray-300  ">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
