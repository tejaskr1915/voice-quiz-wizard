
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Edit, Eye, Trash, Lock, Unlock, Plus, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Mock questions data
const mockQuestions = [
  { id: 1, question: "What is JavaScript?", difficulty: "Easy", views: 245 },
  { id: 2, question: "How does React rendering work?", difficulty: "Medium", views: 189 },
  { id: 3, question: "Explain CSS Grid vs Flexbox", difficulty: "Medium", views: 210 },
  { id: 4, question: "What are Web Components?", difficulty: "Hard", views: 156 },
];

// Mock users data
const mockUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "User", score: 95 },
  { id: 2, name: "Sam Smith", email: "sam@example.com", role: "User", score: 90 },
  { id: 3, name: "Admin User", email: "admin@example.com", role: "Admin", score: 85 },
  { id: 4, name: "Jordan Lee", email: "jordan@example.com", role: "User", score: 80 },
];

const Admin = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-quiz-primary mb-2">Admin Dashboard</h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Manage questions, users, and view statistics</p>
            <div className="flex space-x-2">
              <span className="text-sm text-amber-600 mr-2 my-auto">
                Logged in as {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  logout();
                  toast({ description: "Logged out successfully" });
                }}
              >
                Logout
              </Button>
              <Link to="/">
                <Button size="sm" variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Quiz
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button size="sm" variant="outline">
                  <Trophy className="mr-2 h-4 w-4" />
                  Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="questions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Questions</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>{question.id}</TableCell>
                    <TableCell className="font-medium">{question.question}</TableCell>
                    <TableCell>{question.difficulty}</TableCell>
                    <TableCell>{question.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="users" className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Users</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Best Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {user.role === "Admin" ? (
                          <Lock className="h-4 w-4 mr-1 text-amber-600" />
                        ) : (
                          <Unlock className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        {user.role}
                      </div>
                    </TableCell>
                    <TableCell>{user.score}%</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="stats" className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Quizzes Taken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">324</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76%</div>
                  <p className="text-xs text-muted-foreground">+2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">56</div>
                  <p className="text-xs text-muted-foreground">+5 new this week</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
