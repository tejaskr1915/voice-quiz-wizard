
import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import VideoPlayer from "./VideoPlayer";
import AnswerOption from "./AnswerOption";
import VoiceCommandIndicator from "./VoiceCommandIndicator";
import QuizHelpers from "./QuizHelpers";
import QuizProgress from "./QuizProgress";
import QuizResult from "./QuizResult";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { quizData } from "@/data/quiz-data";

// Mock video URLs with placeholders
const mockVideos = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
];

const Quiz = () => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [eliminatedAnswers, setEliminatedAnswers] = useState<string[]>([]);

  // Helper lifelines
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [autoCorrectUsed, setAutoCorrectUsed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  
  const currentQuestion = quizData[currentQuestionIndex];
  const videoUrl = mockVideos[currentQuestionIndex % mockVideos.length];

  // Speech recognition setup
  useEffect(() => {
    let recognition: SpeechRecognition | null = null;
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setTranscript(transcript);
        
        // Process voice commands
        if (transcript.includes('a') && !transcript.includes('b') && !transcript.includes('c') && !transcript.includes('d')) {
          handleAnswerSelection('A');
        } else if (transcript.includes('b') && !transcript.includes('a') && !transcript.includes('c') && !transcript.includes('d')) {
          handleAnswerSelection('B');
        } else if (transcript.includes('c') && !transcript.includes('a') && !transcript.includes('b') && !transcript.includes('d')) {
          handleAnswerSelection('C');
        } else if (transcript.includes('d') && !transcript.includes('a') && !transcript.includes('b') && !transcript.includes('c')) {
          handleAnswerSelection('D');
        }
      };
      
      recognition.onend = () => {
        if (isListening) {
          recognition?.start();
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);
  
  const toggleListening = () => {
    if (!isListening) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.start();
        setIsListening(true);
        setTranscript("");
        toast({
          title: "Voice commands activated",
          description: "Say A, B, C, or D to select an answer",
        });
      } catch (error) {
        console.error('Speech recognition not supported', error);
        toast({
          variant: "destructive",
          title: "Voice commands not supported",
          description: "Your browser doesn't support speech recognition",
        });
      }
    } else {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.stop();
      } catch (error) {
        console.error('Speech recognition not supported', error);
      }
      setIsListening(false);
      setTranscript("");
    }
  };

  const handleAnswerSelection = (answerId: string) => {
    if (isAnswerRevealed) return;
    
    setSelectedAnswerId(answerId);
    setIsAnswerRevealed(true);
    
    const isCorrect = answerId === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: `The correct answer is ${currentQuestion.correctAnswer}`,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetQuestionState();
    } else {
      setIsQuizCompleted(true);
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswerId(null);
    setIsAnswerRevealed(false);
    setEliminatedAnswers([]);
    setHintUsed(false);
    setTranscript("");
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizCompleted(false);
    setFiftyFiftyUsed(false);
    setAutoCorrectUsed(false);
    resetQuestionState();
  };

  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed) return;
    
    const wrongAnswerIds = ['A', 'B', 'C', 'D'].filter(id => id !== currentQuestion.correctAnswer);
    // Randomly select 2 wrong answers to eliminate
    const shuffled = wrongAnswerIds.sort(() => 0.5 - Math.random());
    const toEliminate = shuffled.slice(0, 2);
    
    setEliminatedAnswers(toEliminate);
    setFiftyFiftyUsed(true);
    
    toast({
      title: "50:50 Used",
      description: "Two incorrect answers have been removed",
    });
  };

  const handleAutoCorrect = () => {
    if (autoCorrectUsed) return;
    
    setSelectedAnswerId(currentQuestion.correctAnswer);
    setIsAnswerRevealed(true);
    setAutoCorrectUsed(true);
    setScore((prevScore) => prevScore + 1);
    
    toast({
      title: "Auto-Correct Used",
      description: "The correct answer has been selected",
    });
  };

  const handleHint = () => {
    if (hintUsed) return;
    
    setHintUsed(true);
    
    toast({
      title: "Hint Used",
      description: "A hint has been provided",
    });
  };

  if (isQuizCompleted) {
    return (
      <div className="quiz-container">
        <QuizResult score={score} totalQuestions={quizData.length} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <QuizProgress 
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData.length}
        score={score}
      />
      
      <h2 className="text-2xl font-bold mb-4 text-center">{currentQuestion.question}</h2>
      
      <VideoPlayer src={videoUrl} />
      
      <QuizHelpers
        onFiftyFifty={handleFiftyFifty}
        onAutoCorrect={handleAutoCorrect}
        onHint={handleHint}
        fiftyFiftyUsed={fiftyFiftyUsed}
        autoCorrectUsed={autoCorrectUsed}
        hintUsed={hintUsed}
        currentHint={currentQuestion.hint}
      />
      
      <VoiceCommandIndicator 
        isListening={isListening}
        toggleListening={toggleListening}
        transcript={transcript}
      />
      
      <div className="space-y-2">
        {Object.entries(currentQuestion.answers).map(([id, text]) => (
          <AnswerOption
            key={id}
            id={id}
            text={text}
            isCorrect={id === currentQuestion.correctAnswer}
            isSelected={selectedAnswerId === id}
            isEliminated={eliminatedAnswers.includes(id)}
            onSelect={handleAnswerSelection}
            isRevealed={isAnswerRevealed}
            disabled={isAnswerRevealed}
          />
        ))}
      </div>
      
      {isAnswerRevealed && (
        <div className="mt-6 flex justify-center">
          <Button 
            className="bg-quiz-secondary hover:bg-quiz-secondary/90 animate-fade-in" 
            onClick={handleNext}
          >
            {currentQuestionIndex < quizData.length - 1 ? (
              <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Show Results <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
