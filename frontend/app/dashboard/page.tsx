"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  BookOpen,
  Eye,
  Edit,
  Trash2,
  Plus,
  Upload,
  ExternalLink,
  TrendingUp,
  CheckCircle,
  Search,
  Pin,
  Heart,
  Tag,
  BarChart3,
  Users,
  Sparkles,
  Bot,
  Clock,
  Code2,
  FileText,
  RefreshCw,
  LinkIcon,
  X,
  Bookmark,
} from "lucide-react"
import Link from "next/link"
import { ProblemChart } from "@/components/problem-chart"
import { AnimatedCounter } from "@/components/animated-counter"
import { useToast } from "@/hooks/use-toast"
import { NoteEditor } from "@/components/note-editor"
import { CodeUpload } from "@/components/code-upload"
import { InterviewPrep } from "@/components/interview-prep"
import { AIAssistant } from "@/components/ai-assistant"
import { TooltipProvider } from "@/components/ui/tooltip"

const motivationalQuotes = [
  "Every expert was once a beginner 🌱",
  "Debugging is like being a detective 🕵️",
  "Code never lies, comments sometimes do 😏",
  "There are only 10 types of people... 🤓",
  "Keep calm and code on ☕",
  "Algorithms are just recipes for computers 👨‍🍳",
  "In code we trust, in bugs we debug 🐛",
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [platforms, setPlatforms] = useState({
    leetcode: "john_doe",
    hackerrank: "",
    codeforces: "johndoe123",
    geeksforgeeks: "",
  })

  const [syncStatus, setSyncStatus] = useState({
    leetcode: null as boolean | null,
    hackerrank: null as boolean | null,
    codeforces: null as boolean | null,
    geeksforgeeks: null as boolean | null,
  })

  const [currentQuote, setCurrentQuote] = useState(0)
  const [searchNotes, setSearchNotes] = useState("")
  const [filterNotes, setFilterNotes] = useState("all")
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    topic: "",
    platform: "LeetCode",
    tags: "",
    isPublic: false,
  })

  const [isVisible, setIsVisible] = useState(false)
  const [externalStats, setExternalStats] = useState({
    leetcode: { solved: 156, rating: 1847, streak: 15, lastSync: "2 hours ago" },
    hackerrank: { solved: 91, rating: 1654, streak: 8, lastSync: "1 day ago" },
    codeforces: { solved: 89, rating: 1432, streak: 12, lastSync: "3 hours ago" },
    geeksforgeeks: { solved: 67, rating: 1289, streak: 5, lastSync: "5 hours ago" },
  })
  const [refreshingStats, setRefreshingStats] = useState(false)

  // New state for Add Platform feature
  const [showAddPlatform, setShowAddPlatform] = useState(false)
  const [newPlatform, setNewPlatform] = useState({
    name: "",
    username: "",
    url: "",
  })
  const [customPlatforms, setCustomPlatforms] = useState([
    {
      id: 1,
      name: "AtCoder",
      username: "john_coder",
      solved: 45,
      rating: 1234,
      streak: 7,
      lastSync: "4 hours ago",
    },
  ])

  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const recentActivity = [
    {
      type: "problem",
      title: "Two Sum",
      platform: "LeetCode",
      difficulty: "Easy",
      time: "2 hours ago",
      status: "solved",
    },
    {
      type: "note",
      title: "Binary Search Notes",
      platform: "Personal",
      time: "5 hours ago",
      status: "uploaded",
    },
    {
      type: "problem",
      title: "Merge Intervals",
      platform: "LeetCode",
      difficulty: "Medium",
      time: "1 day ago",
      status: "solved",
    },
    {
      type: "screenshot",
      title: "Dynamic Programming Solution",
      platform: "HackerRank",
      time: "2 days ago",
      status: "uploaded",
    },
  ]

  const mockNotes = [
    {
      id: 1,
      title: "Two Sum - Optimal Solution",
      platform: "LeetCode",
      topic: "Arrays",
      tags: ["Hash Map", "Easy"],
      isPublic: true,
      isPinned: true,
      isFavorite: false,
      createdAt: "2024-01-15",
      preview:
        "Used hash map for O(n) solution. The key insight is to store complements as we iterate through the array...",
      content: "# Two Sum Solution\n\n## Approach\nUsed hash map for O(n) solution...",
    },
    {
      id: 2,
      title: "Binary Tree Traversal Techniques",
      platform: "HackerRank",
      topic: "Trees",
      tags: ["DFS", "BFS", "Medium"],
      isPublic: false,
      isPinned: false,
      isFavorite: true,
      createdAt: "2024-01-14",
      preview:
        "Comprehensive guide to tree traversal methods including inorder, preorder, postorder, and level-order...",
      content: "# Binary Tree Traversal\n\n## Methods\n1. Inorder\n2. Preorder...",
    },
    {
      id: 3,
      title: "Dynamic Programming Patterns",
      platform: "Codeforces",
      topic: "DP",
      tags: ["DP", "Hard", "Patterns"],
      isPublic: true,
      isPinned: false,
      isFavorite: false,
      createdAt: "2024-01-12",
      preview: "Common DP patterns: 1D DP, 2D DP, Knapsack variants, LIS, LCS, and optimization techniques...",
      content: "# DP Patterns\n\n## Common Patterns\n- 1D DP\n- 2D DP...",
    },
  ]

  const badges = [
    {
      name: "First Steps",
      icon: "🥉",
      earned: true,
      description: "Solved your first problem!",
      progress: 100,
      requirement: "Solve 1 problem",
    },
    {
      name: "Century Club",
      icon: "🥈",
      earned: true,
      description: "100+ problems solved",
      progress: 100,
      requirement: "Solve 100 problems",
    },
    {
      name: "Quarter Master",
      icon: "🥇",
      earned: true,
      description: "250+ problems solved",
      progress: 100,
      requirement: "Solve 250 problems",
    },
    {
      name: "Half Millennium",
      icon: "💎",
      earned: false,
      description: "500+ problems solved",
      progress: 47.8,
      requirement: "Solve 500 problems (239/500)",
    },
    {
      name: "Graph Guru",
      icon: "🌐",
      earned: true,
      description: "50+ graph problems",
      progress: 100,
      requirement: "Solve 50 graph problems",
    },
    {
      name: "DP Destroyer",
      icon: "⚡",
      earned: false,
      description: "100+ DP problems",
      progress: 18,
      requirement: "Solve 100 DP problems (18/100)",
    },
    {
      name: "Streak Master",
      icon: "🔥",
      earned: false,
      description: "30-day solving streak",
      progress: 50,
      requirement: "Maintain 30-day streak (15/30)",
    },
    {
      name: "Secret Badge",
      icon: "👽",
      earned: false,
      description: "???",
      progress: 16.7,
      requirement: "Maintain 90+ day streak (15/90)",
    },
  ]

  const handleSync = () => {
    toast({
      title: "Syncing platforms... 🔄",
      description: "This might take a moment!",
    })

    setTimeout(() => {
      setSyncStatus({
        leetcode: platforms.leetcode ? true : false,
        hackerrank: platforms.hackerrank ? true : false,
        codeforces: platforms.codeforces ? Math.random() > 0.3 : false,
        geeksforgeeks: platforms.geeksforgeeks ? true : false,
      })

      toast({
        title: "Sync complete! ✨",
        description: "Your progress has been updated!",
      })
    }, 2000)
  }

  const handleRefreshStats = () => {
    setRefreshingStats(true)
    toast({
      title: "Refreshing external stats... 🔄",
      description: "Fetching latest data from platforms",
    })

    setTimeout(() => {
      // Mock API call - update stats with slight variations
      setExternalStats((prev) => ({
        leetcode: {
          ...prev.leetcode,
          solved: prev.leetcode.solved + Math.floor(Math.random() * 3),
          lastSync: "Just now",
        },
        hackerrank: {
          ...prev.hackerrank,
          solved: prev.hackerrank.solved + Math.floor(Math.random() * 2),
          lastSync: "Just now",
        },
        codeforces: {
          ...prev.codeforces,
          solved: prev.codeforces.solved + Math.floor(Math.random() * 2),
          lastSync: "Just now",
        },
        geeksforgeeks: {
          ...prev.geeksforgeeks,
          solved: prev.geeksforgeeks.solved + Math.floor(Math.random() * 2),
          lastSync: "Just now",
        },
      }))
      setRefreshingStats(false)
      toast({
        title: "Stats refreshed! ✨",
        description: "External platform data updated successfully",
      })
    }, 2000)
  }

  const handleAddPlatform = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlatform.name || !newPlatform.username) {
      toast({
        title: "Missing information",
        description: "Please fill in platform name and username",
      })
      return
    }

    const newCustomPlatform = {
      id: customPlatforms.length + 1,
      name: newPlatform.name,
      username: newPlatform.username,
      solved: Math.floor(Math.random() * 100) + 10,
      rating: Math.floor(Math.random() * 1000) + 1000,
      streak: Math.floor(Math.random() * 20) + 1,
      lastSync: "Just now",
    }

    setCustomPlatforms([...customPlatforms, newCustomPlatform])
    setNewPlatform({ name: "", username: "", url: "" })
    setShowAddPlatform(false)

    toast({
      title: "Platform added! 🎉",
      description: `${newPlatform.name} has been added to your dashboard`,
    })
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Note saved! 📝",
      description: "Your genius solution has been recorded!",
    })
    setNewNote({
      title: "",
      content: "",
      topic: "",
      platform: "LeetCode",
      tags: "",
      isPublic: false,
    })
  }

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/u/john_doe`)
    toast({
      title: "Link copied! 📋",
      description: "Share your profile with the world!",
    })
  }

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchNotes.toLowerCase()) ||
      note.content.toLowerCase().includes(searchNotes.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchNotes.toLowerCase()))

    const matchesFilter =
      filterNotes === "all" ||
      (filterNotes === "public" && note.isPublic) ||
      (filterNotes === "private" && !note.isPublic) ||
      (filterNotes === "pinned" && note.isPinned) ||
      (filterNotes === "favorites" && note.isFavorite)

    return matchesSearch && matchesFilter
  })

  // Check if user has any connected platforms
  const hasConnectedPlatforms =
    platforms.leetcode ||
    platforms.hackerrank ||
    platforms.codeforces ||
    platforms.geeksforgeeks ||
    customPlatforms.length > 0

  return (
    <TooltipProvider>
      {/* Fixed navbar offset - adding pt-20 to account for navbar height */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        {/* Enhanced Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}>
              {/* Welcome Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Welcome back, <span className="text-blue-600 dark:text-blue-400">Abhishek</span> 👋
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Track your DSA journey, daily problems, and notes — all in one place.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">Daily Problem</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Solve & Track</p>
                  </div>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">Notes</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Solutions & Tips</p>
                  </div>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Bookmark className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">Bookmarked</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Saved Problems</p>
                  </div>
                </div>

                <div className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Bot className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">AI Assistant</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Smart Help</p>
                  </div>
                </div>
              </div>

              {/* Motivation & Streak Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center space-x-3 mb-3 md:mb-0">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {motivationalQuotes[currentQuote]}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Daily inspiration</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-500 dark:text-orange-400">15</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">247</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Total Solved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Progress Overview - GitHub-inspired compact layout */}
          <div className={`mb-6 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                    <AnimatedCounter end={247} duration={1500} />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Total Problems</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-1">
                    <AnimatedCounter end={12} duration={1000} />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">This Week</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-orange-500 dark:text-orange-400 mb-1">
                    <AnimatedCounter end={15} duration={1200} />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Current Streak</div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">
                    <AnimatedCounter end={89} duration={1800} />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Profile Views</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tab Navigation - Clean, minimal */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg h-10">
              <TabsTrigger
                value="dashboard"
                className={`text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                  activeTab === "dashboard"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <BarChart3 className="w-3 h-3 mr-1" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className={`text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                  activeTab === "notes"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="interview"
                className={`text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                  activeTab === "interview"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Users className="w-3 h-3 mr-1" />
                Interview
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className={`text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                  activeTab === "ai"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Bot className="w-3 h-3 mr-1" />
                AI Help
              </TabsTrigger>
              <TabsTrigger
                value="badges"
                className={`text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                  activeTab === "badges"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Trophy className="w-3 h-3 mr-1" />
                Badges
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className={`text-xs font-medium rounded-md transition-all duration-300 ease-in-out ${
                  activeTab === "profile"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                <Users className="w-3 h-3 mr-1" />
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Weekly Progress Chart */}
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Weekly Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ProblemChart />
                    </CardContent>
                  </Card>

                  {/* Enhanced External DSA Accounts Section */}
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                          <div>
                            <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                              <LinkIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              Your External DSA Accounts
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Connect and track your progress across coding platforms
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setShowAddPlatform(!showAddPlatform)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out rounded-lg text-xs h-8"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Platform
                          </Button>
                          <Button
                            onClick={handleRefreshStats}
                            disabled={refreshingStats}
                            size="sm"
                            variant="outline"
                            className="shadow-sm hover:shadow-md transition-all duration-300 ease-in-out rounded-lg border-gray-200 dark:border-gray-700 bg-transparent text-xs h-8"
                          >
                            <RefreshCw className={`w-3 h-3 mr-1 ${refreshingStats ? "animate-spin" : ""}`} />
                            Refresh All
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Add Platform Form */}
                      {showAddPlatform && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm">
                          <form onSubmit={handleAddPlatform} className="space-y-3">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Add New Platform</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAddPlatform(false)}
                                className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors duration-200"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label
                                  htmlFor="platformName"
                                  className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                                >
                                  Platform Name
                                </Label>
                                <Input
                                  id="platformName"
                                  value={newPlatform.name}
                                  onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                                  placeholder="e.g., AtCoder, TopCoder"
                                  className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 text-sm h-8"
                                  required
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="platformUsername"
                                  className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                                >
                                  Username
                                </Label>
                                <Input
                                  id="platformUsername"
                                  value={newPlatform.username}
                                  onChange={(e) => setNewPlatform({ ...newPlatform, username: e.target.value })}
                                  placeholder="Your username"
                                  className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 text-sm h-8"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label
                                htmlFor="platformUrl"
                                className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                              >
                                Profile URL (Optional)
                              </Label>
                              <Input
                                id="platformUrl"
                                value={newPlatform.url}
                                onChange={(e) => setNewPlatform({ ...newPlatform, url: e.target.value })}
                                placeholder="https://platform.com/profile/username"
                                className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 text-sm h-8"
                              />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <Button
                                type="submit"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out rounded-lg text-xs h-7"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Platform
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setShowAddPlatform(false)}
                                className="rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-xs h-7"
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* Empty State */}
                      {!hasConnectedPlatforms && (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <LinkIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            No platforms connected yet
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                            Connect your coding platform accounts to track your progress across different sites in one
                            place.
                          </p>
                          <Button
                            onClick={() => setShowAddPlatform(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300 ease-in-out rounded-lg text-sm"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Platform
                          </Button>
                        </div>
                      )}

                      {/* Platform Cards Grid */}
                      {hasConnectedPlatforms && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {/* LeetCode */}
                          {platforms.leetcode && (
                            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 ease-in-out hover:shadow-md bg-white dark:bg-gray-800">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">L</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">LeetCode</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">@{platforms.leetcode}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-2 py-0"
                                  >
                                    Connected
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-md transition-colors duration-200"
                                  >
                                    <RefreshCw className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.leetcode.solved}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Problems</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.leetcode.rating}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.leetcode.streak}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {externalStats.leetcode.lastSync}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500">Last sync</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* HackerRank */}
                          {platforms.hackerrank && (
                            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 ease-in-out hover:shadow-md bg-white dark:bg-gray-800">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">H</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">HackerRank</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">@{platforms.hackerrank}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-2 py-0"
                                  >
                                    Connected
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors duration-200"
                                  >
                                    <RefreshCw className="w-3 h-3 text-green-600 dark:text-green-400" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.hackerrank.solved}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Problems</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.hackerrank.rating}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.hackerrank.streak}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {externalStats.hackerrank.lastSync}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500">Last sync</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Codeforces */}
                          {platforms.codeforces && (
                            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 ease-in-out hover:shadow-md bg-white dark:bg-gray-800">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">C</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">Codeforces</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">@{platforms.codeforces}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-2 py-0"
                                  >
                                    Connected
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                                  >
                                    <RefreshCw className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.codeforces.solved}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Problems</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.codeforces.rating}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.codeforces.streak}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {externalStats.codeforces.lastSync}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500">Last sync</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* GeeksforGeeks */}
                          {platforms.geeksforgeeks && (
                            <div className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 ease-in-out hover:shadow-md bg-white dark:bg-gray-800">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">G</span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                      GeeksforGeeks
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      @{platforms.geeksforgeeks}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-2 py-0"
                                  >
                                    Connected
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200"
                                  >
                                    <RefreshCw className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.geeksforgeeks.solved}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Problems</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.geeksforgeeks.rating}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {externalStats.geeksforgeeks.streak}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {externalStats.geeksforgeeks.lastSync}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500">Last sync</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Custom Platforms */}
                          {customPlatforms.map((platform) => (
                            <div
                              key={platform.id}
                              className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 ease-in-out hover:shadow-md bg-white dark:bg-gray-800"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-gray-600 dark:text-gray-400 font-bold text-sm">
                                      {platform.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                      {platform.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">@{platform.username}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-2 py-0"
                                  >
                                    Connected
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                                  >
                                    <RefreshCw className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {platform.solved}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Problems</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {platform.rating}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Rating</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                    {platform.streak}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Streak</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {platform.lastSync}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500">Last sync</div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Input fields for disconnected platforms */}
                          {!platforms.leetcode && (
                            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-800/50">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                  <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">L</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">LeetCode</h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect your account</p>
                                </div>
                              </div>
                              <Input
                                placeholder="Enter LeetCode username"
                                value={platforms.leetcode}
                                onChange={(e) => setPlatforms({ ...platforms, leetcode: e.target.value })}
                                className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-500 transition-colors duration-200 text-sm h-8"
                              />
                            </div>
                          )}

                          {!platforms.hackerrank && (
                            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-800/50">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">H</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">HackerRank</h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect your account</p>
                                </div>
                              </div>
                              <Input
                                placeholder="Enter HackerRank username"
                                value={platforms.hackerrank}
                                onChange={(e) => setPlatforms({ ...platforms, hackerrank: e.target.value })}
                                className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 transition-colors duration-200 text-sm h-8"
                              />
                            </div>
                          )}

                          {!platforms.codeforces && (
                            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-800/50">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">C</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">Codeforces</h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect your account</p>
                                </div>
                              </div>
                              <Input
                                placeholder="Enter Codeforces username"
                                value={platforms.codeforces}
                                onChange={(e) => setPlatforms({ ...platforms, codeforces: e.target.value })}
                                className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200 text-sm h-8"
                              />
                            </div>
                          )}

                          {!platforms.geeksforgeeks && (
                            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-800/50">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                  <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">G</span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                    GeeksforGeeks
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Connect your account</p>
                                </div>
                              </div>
                              <Input
                                placeholder="Enter GeeksforGeeks username"
                                value={platforms.geeksforgeeks}
                                onChange={(e) => setPlatforms({ ...platforms, geeksforgeeks: e.target.value })}
                                className="rounded-lg border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 text-sm h-8"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              {activity.type === "problem" && (
                                <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                              {activity.type === "note" && (
                                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                              {activity.type === "screenshot" && (
                                <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{activity.title}</p>
                                {activity.difficulty && (
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${
                                      activity.difficulty === "Easy"
                                        ? "border-green-300 text-green-700 dark:text-green-400"
                                        : activity.difficulty === "Medium"
                                          ? "border-yellow-300 text-yellow-700 dark:text-yellow-400"
                                          : "border-red-300 text-red-700 dark:text-red-400"
                                    }`}
                                  >
                                    {activity.difficulty}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {activity.platform} • {activity.time}
                              </p>
                            </div>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Quick Actions */}
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out text-sm h-9">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Problem
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all duration-300 ease-in-out text-sm h-9"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Notes/Screenshots
                      </Button>
                      <Link href="/profile/abhishek" className="block">
                        <Button
                          variant="outline"
                          className="w-full justify-start rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all duration-300 ease-in-out text-sm h-9"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Public Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Platform Stats */}
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Platform Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-gray-900 dark:text-gray-100">LeetCode</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Problems Solved</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">156</p>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                              +3 this week
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-gray-900 dark:text-gray-100">HackerRank</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Problems Solved</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-orange-500 dark:text-orange-400">91</p>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                              +2 this week
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              {/* Search and Filter */}
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                <CardContent className="p-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                      <Input
                        placeholder="Search notes..."
                        value={searchNotes}
                        onChange={(e) => setSearchNotes(e.target.value)}
                        className="pl-9 rounded-lg border-gray-200 dark:border-gray-700 text-sm h-8"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filterNotes === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterNotes("all")}
                        className="rounded-lg text-xs h-8"
                      >
                        All
                      </Button>
                      <Button
                        variant={filterNotes === "public" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterNotes("public")}
                        className="rounded-lg text-xs h-8"
                      >
                        👁 Public
                      </Button>
                      <Button
                        variant={filterNotes === "private" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterNotes("private")}
                        className="rounded-lg text-xs h-8"
                      >
                        🔒 Private
                      </Button>
                      <Button
                        variant={filterNotes === "pinned" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterNotes("pinned")}
                        className="rounded-lg text-xs h-8"
                      >
                        📌 Pinned
                      </Button>
                      <Button
                        variant={filterNotes === "favorites" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterNotes("favorites")}
                        className="rounded-lg text-xs h-8"
                      >
                        ❤️ Favorites
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger value="notes" className="rounded-md font-medium text-sm">
                    <BookOpen className="w-3 h-3 mr-2" />
                    My Notes
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-md font-medium text-sm">
                    <Upload className="w-3 h-3 mr-2" />
                    Upload Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="notes" className="space-y-4">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Notes List */}
                    <div className="lg:col-span-2 space-y-3">
                      {filteredNotes.length === 0 ? (
                        <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                          <CardContent className="text-center py-8">
                            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                              {searchNotes ? "No notes found" : "No notes yet? Maybe you're a telepathic solver 🧠"}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {searchNotes
                                ? "Try adjusting your search or filters"
                                : "Start adding your brilliant solutions!"}
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        filteredNotes.map((note) => (
                          <Card
                            key={note.id}
                            className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 ease-in-out"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {note.isPinned && <Pin className="w-3 h-3 text-orange-500" />}
                                    <h3 className="font-medium text-base text-gray-900 dark:text-gray-100">
                                      {note.title}
                                    </h3>
                                    {note.isFavorite && <Heart className="w-3 h-3 text-red-500 fill-current" />}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                    {note.preview}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <Badge variant="secondary" className="rounded-lg text-xs">
                                      {note.platform}
                                    </Badge>
                                    <span>{note.topic}</span>
                                    <span>•</span>
                                    <span>{note.createdAt}</span>
                                    <div className="flex items-center gap-1">
                                      {note.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline" className="text-xs rounded-md">
                                          <Tag className="w-2 h-2 mr-1" />
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                    <Badge
                                      variant={note.isPublic ? "default" : "secondary"}
                                      className={`text-xs rounded-md ${
                                        note.isPublic
                                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                          : ""
                                      }`}
                                    >
                                      {note.isPublic ? "👁 Public" : "🔒 Private"}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 h-7 w-7 p-0"
                                  >
                                    <Pin className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 h-7 w-7 p-0"
                                  >
                                    <Heart className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 h-7 w-7 p-0"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 h-7 w-7 p-0"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>

                    {/* Add Note Sidebar */}
                    <div className="space-y-4">
                      <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100 text-base">
                            <Plus className="w-4 h-4" />
                            Add Note
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={handleAddNote} className="space-y-3">
                            <div className="space-y-1">
                              <Label
                                htmlFor="noteTitle"
                                className="font-medium text-gray-900 dark:text-gray-100 text-sm"
                              >
                                Question Title
                              </Label>
                              <Input
                                id="noteTitle"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                placeholder="e.g., Two Sum"
                                required
                                className="rounded-lg border-gray-200 dark:border-gray-700 text-sm h-8"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label
                                  htmlFor="notePlatform"
                                  className="font-medium text-gray-900 dark:text-gray-100 text-sm"
                                >
                                  Platform
                                </Label>
                                <select
                                  id="notePlatform"
                                  value={newNote.platform}
                                  onChange={(e) => setNewNote({ ...newNote, platform: e.target.value })}
                                  className="w-full h-8 px-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
                                >
                                  <option value="LeetCode">LeetCode</option>
                                  <option value="HackerRank">HackerRank</option>
                                  <option value="Codeforces">Codeforces</option>
                                  <option value="GeeksforGeeks">GeeksforGeeks</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <Label
                                  htmlFor="noteTopic"
                                  className="font-medium text-gray-900 dark:text-gray-100 text-sm"
                                >
                                  Topic
                                </Label>
                                <Input
                                  id="noteTopic"
                                  value={newNote.topic}
                                  onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })}
                                  placeholder="e.g., Arrays"
                                  required
                                  className="rounded-lg border-gray-200 dark:border-gray-700 text-sm h-8"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label
                                htmlFor="noteTags"
                                className="font-medium text-gray-900 dark:text-gray-100 text-sm"
                              >
                                Tags
                              </Label>
                              <Input
                                id="noteTags"
                                value={newNote.tags}
                                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                                placeholder="Hash Map, Easy, O(n)"
                                className="rounded-lg border-gray-200 dark:border-gray-700 text-sm h-8"
                              />
                            </div>

                            <div className="space-y-1">
                              <Label
                                htmlFor="noteContent"
                                className="font-medium text-gray-900 dark:text-gray-100 text-sm"
                              >
                                Solution Notes
                              </Label>
                              <NoteEditor
                                value={newNote.content}
                                onChange={(value) => setNewNote({ ...newNote, content: value })}
                                placeholder="Write your solution approach, insights, or key learnings... Use markdown for code blocks! 🚀"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="public"
                                  checked={newNote.isPublic}
                                  onCheckedChange={(checked) => setNewNote({ ...newNote, isPublic: checked })}
                                />
                                <Label
                                  htmlFor="public"
                                  className="font-medium text-gray-900 dark:text-gray-100 text-sm"
                                >
                                  👁 Make public
                                </Label>
                              </div>

                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="rounded-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-xs h-7"
                              >
                                <Upload className="w-3 h-3 mr-1" />
                                Upload PDF
                              </Button>
                            </div>

                            <Button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out text-sm h-8"
                            >
                              <Plus className="w-3 h-3 mr-2" />
                              Save Note 📝
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                  <CodeUpload />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges" className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-medium mb-3 text-gray-900 dark:text-gray-100">🏆 Badges & Achievements</h2>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  Unlock badges by solving problems and maintaining streaks
                </p>
              </div>

              {badges.length === 0 ? (
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                  <CardContent className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      No badges? Time to grind, legend 💪
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Start solving problems to unlock your first badge!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <Card
                      key={index}
                      className={`border-0 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out ${
                        badge.earned
                          ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
                          : "bg-gray-50 dark:bg-gray-900 opacity-75"
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="relative mb-3">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl ${
                              badge.earned
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 shadow-md"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                          >
                            {badge.earned ? badge.icon : "🔒"}
                          </div>
                          {badge.earned && (
                            <div className="absolute -top-1 -right-1">
                              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                            </div>
                          )}
                        </div>

                        <h3
                          className={`font-bold text-base mb-2 ${badge.earned ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {badge.name}
                        </h3>
                        <p
                          className={`text-sm mb-3 ${badge.earned ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {badge.description}
                        </p>

                        {!badge.earned && (
                          <div className="space-y-2">
                            <Progress value={badge.progress} className="h-2" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">{badge.requirement}</p>
                          </div>
                        )}

                        {badge.earned && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Earned
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Public Profile Preview */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        <Eye className="w-4 h-4" />
                        Public Profile Preview
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                        This is how your profile appears to recruiters and other developers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Profile Header Preview */}
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-white">A</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Abhishek Sharma</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Fullstack Dev & DSA Wizard 🧙‍♂️</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="rounded-lg text-xs">
                            <ExternalLink className="w-2 h-2 mr-1" />
                            LeetCode: john_doe
                          </Badge>
                          <Badge variant="secondary" className="rounded-lg text-xs">
                            <ExternalLink className="w-2 h-2 mr-1" />
                            Codeforces: johndoe123
                          </Badge>
                        </div>

                        <div className="grid grid-cols-4 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">127</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Easy</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-yellow-600">89</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Medium</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">23</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Hard</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">239</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/u/abhishek-sharma" target="_blank" className="flex-1">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out text-sm h-9">
                            <Eye className="w-3 h-3 mr-2" />👁 View Public Profile
                            <ExternalLink className="w-3 h-3 ml-2" />
                          </Button>
                        </Link>
                        <Button
                          onClick={copyProfileLink}
                          variant="outline"
                          className="flex-1 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-sm transition-all duration-300 ease-in-out text-sm h-9"
                        >
                          📤 Copy Profile Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Settings */}
                <div className="space-y-4">
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        ⚙️ Profile Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            👁 Public Profile
                          </Label>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Make your profile visible to everyone
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium text-gray-900 dark:text-gray-100 text-sm">📊 Show Stats</Label>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Display problem solving statistics</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            📝 Show Public Notes
                          </Label>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Display your public notes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-medium text-gray-900 dark:text-gray-100 text-sm">🏆 Show Badges</Label>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Display earned badges</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        📊 Profile Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Profile Views</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Profile Shares</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Note Views</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">3,456</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Note Likes</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">234</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Interview Tab */}
            <TabsContent value="interview" className="space-y-6">
              <InterviewPrep />
            </TabsContent>

            {/* AI Assistant Tab */}
            <TabsContent value="ai" className="space-y-6">
              <AIAssistant />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
