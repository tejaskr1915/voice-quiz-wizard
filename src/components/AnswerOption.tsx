
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnswerOptionProps {
  id: string;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
  isEliminated: boolean;
  onSelect: (id: string) => void;
  isRevealed: boolean;
  disabled?: boolean;
}

const AnswerOption = ({
  id,
  text,
  isCorrect,
  isSelected,
  isEliminated,
  onSelect,
  isRevealed,
  disabled = false
}: AnswerOptionProps) => {
  const getBgColor = () => {
    if (isRevealed) {
      if (isCorrect) return "bg-green-600 hover:bg-green-700";
      if (isSelected) return "bg-red-600 hover:bg-red-700";
      return "bg-gray-400 opacity-70";
    }
    
    if (isEliminated) {
      return "bg-gray-400 opacity-50 cursor-not-allowed";
    }
    
    if (isSelected) {
      return "bg-quiz-secondary hover:bg-quiz-secondary/90";
    }
    
    return "bg-quiz-primary hover:bg-quiz-primary/90";
  };

  return (
    <Button
      className={cn(
        "answer-button w-full mb-4 text-lg font-medium animate-fade-in",
        getBgColor(),
        isEliminated && "pointer-events-none"
      )}
      onClick={() => !disabled && !isEliminated && onSelect(id)}
      disabled={disabled || isEliminated}
    >
      <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
        {id}
      </span>
      {text}
    </Button>
  );
};

export default AnswerOption;
