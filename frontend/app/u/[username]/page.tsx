"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  ExternalLink,
  Trophy,
  BookOpen,
  TrendingUp,
  Flame,
  Calendar,
  Star,
  Heart,
  Tag,
  Github,
  Linkedin,
  Activity,
  Bookmark,
} from "lucide-react"
import { ProblemChart } from "@/components/problem-chart"
import { HeatmapChart } from "@/components/heatmap-chart"
import { AnimatedCounter } from "@/components/animated-counter"
import { useToast } from "@/hooks/use-toast"

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const username = params.username
  const { toast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Profile link copied! 📋",
      description: "Share this awesome profile with everyone!",
    })
  }

  const publicNotes = [
    {
      id: 1,
      title: "Two Sum - Optimal Solution",
      platform: "LeetCode",
      topic: "Arrays",
      tags: ["Hash Map", "Easy"],
      createdAt: "2024-01-15",
      content:
        "Used hash map for O(n) solution. The key insight is to store complements as we iterate through the array. This reduces time complexity from O(n²) to O(n).",
      likes: 23,
    },
    {
      id: 3,
      title: "Dynamic Programming Patterns",
      platform: "Codeforces",
      topic: "DP",
      tags: ["DP", "Hard", "Patterns"],
      createdAt: "2024-01-12",
      content:
        "Common DP patterns: 1D DP for sequences, 2D DP for grids, Knapsack variants for optimization problems. The key is identifying the state and transition.",
      likes: 15,
    },
  ]

  const recentActivity = [
    { problem: "Binary Tree Maximum Path Sum", difficulty: "Hard", platform: "LeetCode", date: "2 days ago" },
    { problem: "Longest Palindromic Substring", difficulty: "Medium", platform: "LeetCode", date: "3 days ago" },
    { problem: "Merge k Sorted Lists", difficulty: "Hard", platform: "LeetCode", date: "5 days ago" },
    { problem: "Valid Parentheses", difficulty: "Easy", platform: "HackerRank", date: "1 week ago" },
  ]

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "notes", label: "Notes Shared", icon: BookOpen },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { id: "activity", label: "Activity", icon: Activity },
  ]

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <Card
          className={`shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-white dark:bg-gray-800 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">{username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {username.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Fullstack Dev & DSA Wizard 🧙‍♂️</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">🇮🇳 India • Member since Jan 2024</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      <Trophy className="w-3 h-3 mr-1" />
                      Top 10%
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Flame className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <Star className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  {/* Platform Links */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      LeetCode: john_doe
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Codeforces: johndoe123
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter end={239} duration={1000} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Problems</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    <AnimatedCounter end={15} duration={800} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    <AnimatedCounter end={1247} duration={1200} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={copyProfileLink}
                  variant="outline"
                  size="sm"
                  className="rounded-lg hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="rounded-lg p-2">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-lg p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Problem Summary */}
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      Problem Solving Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          <AnimatedCounter end={127} duration={1000} />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Easy</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 mb-1">
                          <AnimatedCounter end={89} duration={1200} />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Medium</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          <AnimatedCounter end={23} duration={800} />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Hard</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          <AnimatedCounter end={239} duration={1500} />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">Topic Mastery</h4>
                        <ProblemChart />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">Activity Heatmap</h4>
                        <HeatmapChart />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="w-5 h-5 text-green-600" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((problem, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:scale-[1.02] transition-all duration-200"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{problem.problem}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <span>{problem.platform}</span>
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  problem.difficulty === "Easy"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : problem.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {problem.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{problem.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Achievements */}
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Badge className="w-full justify-center py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 hover:scale-105 transition-all duration-200">
                      <Trophy className="w-4 h-4 mr-2" />
                      100+ Problems Solved
                    </Badge>
                    <Badge className="w-full justify-center py-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 hover:scale-105 transition-all duration-200">
                      <Trophy className="w-4 h-4 mr-2" />
                      250+ Problems Solved
                    </Badge>
                    <Badge className="w-full justify-center py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:scale-105 transition-all duration-200">
                      <Trophy className="w-4 h-4 mr-2" />
                      Graph Guru
                    </Badge>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                      <span className="font-semibold text-orange-600">15 days 🔥</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Best Streak</span>
                      <span className="font-semibold text-gray-900 dark:text-white">28 days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Public Notes</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{publicNotes.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Total Likes</span>
                      <span className="font-semibold text-gray-900 dark:text-white">38</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Connect */}
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Connect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Impressed by this profile? Connect with {username.replace("-", " ")} on their coding platforms!
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on LeetCode
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Codeforces
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              {publicNotes.length === 0 ? (
                <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No shared notes yet</h3>
                    <p className="text-gray-500 dark:text-gray-500">This user hasn't shared any notes publicly.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {publicNotes.map((note) => (
                    <Card
                      key={note.id}
                      className="shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 border-0 bg-white dark:bg-gray-800"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{note.title}</h4>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>{note.likes}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{note.content}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Badge variant="secondary" className="text-xs">
                            {note.platform}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {note.topic}
                          </Badge>
                          {note.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                          <span className="flex items-center gap-1 ml-auto">
                            <Calendar className="w-3 h-3" />
                            {note.createdAt}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "bookmarks" && (
            <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
              <CardContent className="text-center py-12">
                <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No bookmarks shared</h3>
                <p className="text-gray-500 dark:text-gray-500">This user hasn't shared any bookmarks publicly.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "activity" && (
            <Card className="shadow-sm border-0 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:scale-[1.02] transition-all duration-200"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          Solved <span className="text-blue-600">{activity.problem}</span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.platform} • {activity.date}
                        </p>
                      </div>
                      <Badge
                        className={`text-xs ${
                          activity.difficulty === "Easy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : activity.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {activity.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer CTA */}
        <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Want your own profile?</h3>
            <p className="text-blue-100 text-sm mb-4">Start your journey and showcase your skills!</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100" size="sm">
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
