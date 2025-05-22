
import React from "react";
import Quiz from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-quiz-primary mb-2">Voice Command Video Quiz</h1>
          <p className="text-gray-600">Answer questions using your voice or click on options</p>
          <div className="mt-2">
            <Link to="/leaderboard">
              <Button variant="outline" className="mr-2">View Leaderboard</Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
        </header>
        
        <Quiz />
      </div>
    </div>
  );
};

export default Index;
