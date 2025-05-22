
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Medal, Trophy } from "lucide-react";

// Mock leaderboard data - this would come from a database in a real app
const mockLeaderboard = [
  { id: 1, name: "Alex Johnson", score: 95, date: "2025-05-21" },
  { id: 2, name: "Sam Smith", score: 90, date: "2025-05-20" },
  { id: 3, name: "Taylor Brown", score: 85, date: "2025-05-19" },
  { id: 4, name: "Jordan Lee", score: 80, date: "2025-05-18" },
  { id: 5, name: "Casey Wilson", score: 75, date: "2025-05-17" },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-quiz-primary mb-2 flex items-center justify-center">
            <Trophy className="mr-3 h-8 w-8" />
            Leaderboard
          </h1>
          <p className="text-gray-600">Top quiz performers</p>
        </header>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((entry, index) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {index === 0 && <Medal className="h-5 w-5 text-yellow-500 mr-1" />}
                      {index === 1 && <Medal className="h-5 w-5 text-gray-400 mr-1" />}
                      {index === 2 && <Medal className="h-5 w-5 text-amber-700 mr-1" />}
                      {index > 2 && `${index + 1}`}
                    </div>
                  </TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell className="font-bold">{entry.score}%</TableCell>
                  <TableCell className="text-right text-gray-500">{entry.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 flex justify-center">
            <Link to="/">
              <Button className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
