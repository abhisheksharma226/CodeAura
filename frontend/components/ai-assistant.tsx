"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, Lightbulb, Code2, BookOpen, Target, Zap, Brain, MessageCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm your AI coding assistant. I can help you with:\n\n• Code optimization and review\n• Algorithm explanations\n• Problem-solving strategies\n• Interview preparation tips\n\nWhat would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    { icon: Code2, label: "Review my code", prompt: "Can you review my latest solution and suggest improvements?" },
    { icon: Lightbulb, label: "Explain algorithm", prompt: "Explain how binary search works with examples" },
    { icon: Target, label: "Practice problems", prompt: "Suggest 5 medium-level array problems for practice" },
    { icon: BookOpen, label: "Study plan", prompt: "Create a 30-day study plan for technical interviews" },
  ]

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("code") || input.includes("review")) {
      return "I'd be happy to review your code! Please share your solution and I'll analyze:\n\n• Time & space complexity\n• Code readability\n• Potential optimizations\n• Edge cases to consider\n\nJust paste your code in the next message!"
    }

    if (input.includes("binary search")) {
      return "Binary Search is a divide-and-conquer algorithm! 🎯\n\n**How it works:**\n1. Start with sorted array\n2. Compare target with middle element\n3. If target < middle: search left half\n4. If target > middle: search right half\n5. Repeat until found or exhausted\n\n**Time Complexity:** O(log n)\n**Space Complexity:** O(1)\n\nWant me to show you a code example?"
    }

    if (input.includes("practice") || input.includes("problems")) {
      return "Here are 5 great medium-level array problems to practice:\n\n1. **3Sum** - Find triplets that sum to zero\n2. **Container With Most Water** - Two pointers technique\n3. **Product of Array Except Self** - Prefix/suffix arrays\n4. **Rotate Array** - In-place rotation\n5. **Subarray Sum Equals K** - Hash map optimization\n\nStart with 3Sum - it's a classic! Need hints for any of these?"
    }

    if (input.includes("study plan") || input.includes("interview")) {
      return "Here's your 30-day technical interview study plan! 📚\n\n**Week 1-2: Foundations**\n• Arrays & Strings (2-3 problems/day)\n• Hash Tables & Two Pointers\n• Basic recursion\n\n**Week 3-4: Core Concepts**\n• Trees & Graphs (BFS/DFS)\n• Dynamic Programming basics\n• Sorting & Searching\n\n**Week 5-6: Advanced + Practice**\n• System design fundamentals\n• Mock interviews (2-3/week)\n• Company-specific problems\n\nWant me to break down any specific week?"
    }

    return "That's a great question! I'm here to help with coding problems, algorithm explanations, interview prep, and code reviews. Could you be more specific about what you'd like to work on? 🤔"
  }

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-poppins mb-4 text-[#1F2937]">🤖 AI Coding Assistant</h2>
        <p className="text-xl text-[#1F2937]/70">Get instant help with coding problems and interview prep</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 rounded-2xl bg-white h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2 text-xl font-poppins text-[#1F2937]">
                <Bot className="w-6 h-6 text-[#2563EB]" />
                AI Assistant
                <Badge className="bg-green-100 text-green-800 ml-auto">Online</Badge>
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === "user" ? "bg-[#2563EB] text-white" : "bg-gray-100 text-[#1F2937]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-[#1F2937]/60"}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-[#1F2937] p-4 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#1F2937]/60">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about coding..."
                  className="rounded-xl border-2"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                />
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  className="bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-xl px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions & Features */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-[#1F2937]">⚡ Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start rounded-xl border-2 bg-white hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-[#1F2937]">🧠 AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <Brain className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-semibold text-sm text-[#1F2937]">Code Analysis</div>
                  <div className="text-xs text-[#1F2937]/60">Complexity & optimization</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-sm text-[#1F2937]">Problem Solving</div>
                  <div className="text-xs text-[#1F2937]/60">Step-by-step guidance</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <Target className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold text-sm text-[#1F2937]">Interview Prep</div>
                  <div className="text-xs text-[#1F2937]/60">Mock questions & tips</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <Zap className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-sm text-[#1F2937]">Instant Help</div>
                  <div className="text-xs text-[#1F2937]/60">24/7 availability</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="shadow-xl border-0 rounded-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-poppins text-[#1F2937]">📊 Your AI Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1F2937]/60">Questions Asked</span>
                <span className="font-bold text-[#1F2937]">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1F2937]/60">Code Reviews</span>
                <span className="font-bold text-[#1F2937]">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1F2937]/60">Problems Solved</span>
                <span className="font-bold text-[#1F2937]">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1F2937]/60">Success Rate</span>
                <span className="font-bold text-green-600">89%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
