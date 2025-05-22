
import React from "react";
import Quiz from "@/components/Quiz";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-quiz-primary mb-2">Voice Command Video Quiz</h1>
          <p className="text-gray-600">Answer questions using your voice or click on options</p>
        </header>
        
        <Quiz />
      </div>
    </div>
  );
};

export default Index;
