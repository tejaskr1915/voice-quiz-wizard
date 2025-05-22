
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, RotateCcw } from "lucide-react";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResult = ({ score, totalQuestions, onRestart }: QuizResultProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "Great job!";
  let color = "text-green-600";
  
  if (percentage < 40) {
    message = "Keep practicing!";
    color = "text-red-600";
  } else if (percentage < 70) {
    message = "Not bad!";
    color = "text-amber-600";
  }

  return (
    <Card className="animate-scale-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl mb-2">Quiz Completed!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-7xl font-bold mb-2 text-quiz-primary">{percentage}%</p>
          <p className={`text-xl font-medium ${color}`}>{message}</p>
          <p className="text-gray-500 mt-2">
            You scored {score} out of {totalQuestions} questions correctly
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          className="w-full bg-quiz-secondary hover:bg-quiz-secondary/80" 
          onClick={onRestart}
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizResult;
