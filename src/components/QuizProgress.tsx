
import React from "react";
import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

const QuizProgress = ({ currentQuestion, totalQuestions, score }: QuizProgressProps) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">
          Question {currentQuestion}/{totalQuestions}
        </span>
        <span className="text-sm font-medium">
          Score: {score}
        </span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default QuizProgress;
