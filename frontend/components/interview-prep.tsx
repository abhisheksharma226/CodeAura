"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Target, BookOpen, Play, CheckCircle, Building, Zap } from "lucide-react"

export function InterviewPrep() {
  const companies = [
    { name: "Google", problems: 150, completed: 45, difficulty: "Hard", color: "bg-blue-500" },
    { name: "Meta", problems: 120, completed: 32, difficulty: "Medium", color: "bg-blue-600" },
    { name: "Amazon", problems: 200, completed: 78, difficulty: "Medium", color: "bg-orange-500" },
    { name: "Microsoft", problems: 100, completed: 67, difficulty: "Easy", color: "bg-green-500" },
  ]

  const mockInterviews = [
    { title: "System Design Basics", duration: "45 min", difficulty: "Medium", completed: false },
    { title: "Coding Interview Practice", duration: "60 min", difficulty: "Hard", completed: true },
    { title: "Behavioral Questions", duration: "30 min", difficulty: "Easy", completed: true },
    { title: "Advanced Algorithms", duration: "90 min", difficulty: "Hard", completed: false },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-poppins mb-4 text-[#1F2937]">🎯 Interview Preparation Hub</h2>
        <p className="text-xl text-[#1F2937]/70">Practice company-specific problems and mock interviews</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Company-Specific Practice */}
        <Card className="shadow-xl border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-poppins text-[#1F2937]">
              <Building className="w-5 h-5 text-[#2563EB]" />
              Company-Specific Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {companies.map((company, index) => (
              <div
                key={index}
                className="p-4 border-2 rounded-2xl bg-gradient-to-r from-white to-gray-50 card-hover transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${company.color}`}></div>
                    <h3 className="font-semibold text-[#1F2937]">{company.name}</h3>
                    <Badge
                      className={`text-xs rounded-xl ${
                        company.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : company.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {company.difficulty}
                    </Badge>
                  </div>
                  <Button size="sm" className="bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-xl">
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[#1F2937]/60">
                    <span>
                      {company.completed}/{company.problems} completed
                    </span>
                    <span>{Math.round((company.completed / company.problems) * 100)}%</span>
                  </div>
                  <Progress value={(company.completed / company.problems) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mock Interviews */}
        <Card className="shadow-xl border-0 rounded-2xl bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-poppins text-[#1F2937]">
              <Users className="w-5 h-5 text-[#2563EB]" />
              Mock Interview Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockInterviews.map((interview, index) => (
              <div
                key={index}
                className="p-4 border-2 rounded-2xl bg-gradient-to-r from-white to-gray-50 card-hover transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#1F2937]">{interview.title}</h3>
                  {interview.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Button size="sm" className="bg-[#F97316] hover:bg-[#F97316]/90 rounded-xl">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-[#1F2937]/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {interview.duration}
                  </div>
                  <Badge
                    className={`text-xs rounded-xl ${
                      interview.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : interview.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {interview.difficulty}
                  </Badge>
                  {interview.completed && <span className="text-green-600 font-medium">✓ Completed</span>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 text-center shadow-lg border-0 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 card-hover transition-all duration-300 hover:scale-105">
          <Target className="w-8 h-8 text-[#2563EB] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#2563EB] mb-1">222</div>
          <div className="text-sm text-[#1F2937]/60">Problems Solved</div>
        </Card>

        <Card className="p-6 text-center shadow-lg border-0 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 card-hover transition-all duration-300 hover:scale-105">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600 mb-1">8</div>
          <div className="text-sm text-[#1F2937]/60">Mock Interviews</div>
        </Card>

        <Card className="p-6 text-center shadow-lg border-0 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 card-hover transition-all duration-300 hover:scale-105">
          <Clock className="w-8 h-8 text-[#F97316] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#F97316] mb-1">24h</div>
          <div className="text-sm text-[#1F2937]/60">Practice Time</div>
        </Card>

        <Card className="p-6 text-center shadow-lg border-0 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 card-hover transition-all duration-300 hover:scale-105">
          <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
          <div className="text-sm text-[#1F2937]/60">Success Rate</div>
        </Card>
      </div>

      {/* Study Plan */}
      <Card className="shadow-xl border-0 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-poppins text-[#1F2937]">
            <BookOpen className="w-5 h-5 text-[#2563EB]" />📚 Recommended Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 text-[#1F2937]">Week 1-2: Foundations</h3>
              <ul className="space-y-2 text-sm text-[#1F2937]/70">
                <li>• Arrays & Strings (20 problems)</li>
                <li>• Hash Tables (15 problems)</li>
                <li>• Two Pointers (10 problems)</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 text-[#1F2937]">Week 3-4: Intermediate</h3>
              <ul className="space-y-2 text-sm text-[#1F2937]/70">
                <li>• Trees & Graphs (25 problems)</li>
                <li>• Dynamic Programming (20 problems)</li>
                <li>• Backtracking (15 problems)</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <h3 className="font-bold text-lg mb-3 text-[#1F2937]">Week 5-6: Advanced</h3>
              <ul className="space-y-2 text-sm text-[#1F2937]/70">
                <li>• System Design (5 sessions)</li>
                <li>• Mock Interviews (10 sessions)</li>
                <li>• Company-specific prep</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
