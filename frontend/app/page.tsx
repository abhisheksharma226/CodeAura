"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  ArrowRight,
  Target,
  Code2,
  CheckCircle,
  Github,
  Moon,
  Sun,
  BookOpen,
  Brain,
  Zap,
  User,
} from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"
import { HeroChart } from "@/components/hero-chart"
import { useTheme } from "next-themes"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              TrackMy<span className="text-blue-600">DSA</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Home
              </Link>
              {/* <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/u/demo" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Profile
              </Link> */}
              <Link href="/documentation" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Documentation
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="/login">
                <Button variant="outline" size="sm" className="font-medium bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                >
                  🚀 Track Your Coding Journey
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-light tracking-tight leading-none">
                  <span className="font-serif italic">Code.</span> <span className="font-serif italic">Conquer.</span>{" "}
                  <span className="font-serif italic text-blue-600">Climb.</span>
                </h1>


                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                Track your code. Sharpen your skills. Crack every challenge — with guided DSA prep, real-time insights, and progress that actually matters.
                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 text-base font-medium"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/u/demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-base font-medium border-2 bg-transparent"
                  >
                    Demo Public Profile
                  </Button>
                </Link>
                <Link href="https://github.com" target="_blank">
                  <Button variant="ghost" size="lg" className="px-8 py-4 text-base font-medium">
                    <Github className="mr-2 w-5 h-5" />
                    GitHub
                  </Button>
                </Link>
              </div>

              {/* Platform Logos */}
              <div className="pt-10">
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wider">
                  Seamless Integration with Top Coding Platforms
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
                  <span className="px-3 py-1 rounded-md bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200 shadow-sm">
                    LeetCode
                  </span>
                  <span className="px-3 py-1 rounded-md bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 shadow-sm">
                    GeeksforGeeks
                  </span>
                  <span className="px-3 py-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 shadow-sm">
                    Codeforces
                  </span>
                  <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 shadow-sm">
                    HackerRank
                  </span>
                </div>
              </div>

            </div>

            {/* Right Content - Chart */}
            <div className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}>
              <Card className="p-8 shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Progress Overview</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
                  </div>
                </div>
                <HeroChart />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight mb-4">Everything you need to excel</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built for developers who want to master algorithms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Daily Challenge */}
            <Card className="p-8 border-0 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Daily Challenge</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Curated problems to keep your skills sharp and build consistent practice habits.
              </p>
              <div className="flex items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                Adaptive difficulty
              </div>
            </Card>

            {/* Notes System */}
            <Card className="p-8 border-0 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Smart Notes</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Document solutions with rich markdown, code snippets, and organize by topics.
              </p>
              <div className="flex items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                Markdown support
              </div>
            </Card>

            {/* AI Explainer
            <Card className="p-8 border-0 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">AI Explainer</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Get instant explanations and hints for complex algorithms and data structures.
              </p>
              <div className="flex items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                Powered by AI
              </div>
            </Card> */}

            {/* Public Profile */}
            <Card className="p-8 border-0 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Sharable Public Profile</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Showcase your coding journey with a public DSA profile — complete with solved problems, notes, and platform stats.
              </p>
              <div className="flex items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                Share with recruiters & peers
              </div>
            </Card>


            {/* Bookmarking */}
            <Card className="p-8 border-0 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Quick Access</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Bookmark important problems and create custom study lists for focused practice.
              </p>
              <div className="flex items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                Custom lists
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl font-light italic text-gray-700 dark:text-gray-300 mb-8">
            "The best way to learn algorithms is to track your progress and understand your patterns. This platform
            makes it effortless."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div className="text-left">
              <div className="font-semibold">Abhishek Sharma</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Fresher with a Vision to Become an SDE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-16">Trusted by developers worldwide</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <div className="text-4xl font-light mb-2">
                <AnimatedCounter end={15000} duration={2000} />+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Developers</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">
                <AnimatedCounter end={500000} duration={2500} />+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Problems</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">
                <AnimatedCounter end={25000} duration={2200} />+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notes</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">
                <AnimatedCounter end={95} duration={1800} />%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-900 dark:bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Ready to level up your coding journey?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are mastering algorithms with intelligent tracking.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-base font-medium">
              Start Your Journey Today
              <Target className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TrackMyDsa</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                The professional way to track your Data Structures and Algorithms journey. Build your portfolio and
                impress recruiters.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {/* <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Demo
                  </Link>
                </li> */}
                <li>
                  <Link href="/documentation" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  TrackMyDsa
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/company" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2025 TrackMyDsa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
