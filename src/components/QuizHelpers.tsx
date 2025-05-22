
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, Check, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuizHelpersProps {
  onFiftyFifty: () => void;
  onAutoCorrect: () => void;
  onHint: () => void;
  fiftyFiftyUsed: boolean;
  autoCorrectUsed: boolean;
  hintUsed: boolean;
  currentHint: string;
}

const QuizHelpers = ({
  onFiftyFifty,
  onAutoCorrect,
  onHint,
  fiftyFiftyUsed,
  autoCorrectUsed,
  hintUsed,
  currentHint,
}: QuizHelpersProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-center gap-4 mb-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full h-12 w-12",
                  fiftyFiftyUsed && "opacity-50 cursor-not-allowed"
                )}
                onClick={!fiftyFiftyUsed ? onFiftyFifty : undefined}
                disabled={fiftyFiftyUsed}
              >
                <CircleDashed className="h-6 w-6" />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>50:50 - Eliminate two wrong answers</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full h-12 w-12",
                  autoCorrectUsed && "opacity-50 cursor-not-allowed"
                )}
                onClick={!autoCorrectUsed ? onAutoCorrect : undefined}
                disabled={autoCorrectUsed}
              >
                <Check className="h-6 w-6" />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Auto-correct - Selects the correct answer</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full h-12 w-12",
                  hintUsed && "opacity-50 cursor-not-allowed"
                )}
                onClick={!hintUsed ? onHint : undefined}
                disabled={hintUsed}
              >
                <HelpCircle className="h-6 w-6" />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hint - Get a helpful hint</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {hintUsed && currentHint && (
        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-6 rounded animate-fade-in">
          <p className="text-sm font-medium">Hint:</p>
          <p>{currentHint}</p>
        </div>
      )}
    </TooltipProvider>
  );
};

export default QuizHelpers;
