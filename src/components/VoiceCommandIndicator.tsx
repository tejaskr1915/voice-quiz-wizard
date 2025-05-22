
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceCommandIndicatorProps {
  isListening: boolean;
  toggleListening: () => void;
  transcript?: string;
}

const VoiceCommandIndicator = ({
  isListening,
  toggleListening,
  transcript,
}: VoiceCommandIndicatorProps) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="lg"
        className={cn(
          "rounded-full p-4 h-16 w-16 flex items-center justify-center transition-all duration-300",
          isListening && "animate-pulse-light"
        )}
        onClick={toggleListening}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      {isListening && (
        <div className="mt-2 p-2 bg-muted rounded-md text-sm animate-fade-in">
          {transcript ? transcript : "Listening..."}
        </div>
      )}
      
      <p className="mt-2 text-sm text-muted-foreground">
        {isListening 
          ? "Say 'A', 'B', 'C', or 'D' to select an answer" 
          : "Click to enable voice commands"}
      </p>
    </div>
  );
};

export default VoiceCommandIndicator;
