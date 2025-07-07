"use client"

import { useRouter } from "next/navigation"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Github, Mail, Rocket } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    router.push("/login")
  }, [router])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Welcome to the grind! 🎉",
        description: "Your coding journey starts now!",
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold">Join the Grind! 🚀</CardTitle>
          <CardDescription className="text-lg">Start tracking your DSA journey today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  required
                  className="h-12 rounded-xl border-2 focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="h-12 rounded-xl border-2 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                className="h-12 rounded-xl border-2 focus:border-orange-500 transition-colors"
              />
              <p className="text-xs text-gray-500 italic">Don't worry, we won't leak your LeetCode ID 🤐</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Make it strong like your algorithms"
                  required
                  className="h-12 rounded-xl border-2 focus:border-orange-500 transition-colors pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 italic">At least 8 characters, like a good hash function 🔐</p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Creating your account... 🛠️" : "Start My Journey! 🎯"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-2 bg-white hover:bg-gray-50">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-2 bg-white hover:bg-gray-50">
              <Mail className="mr-2 h-5 w-5" />
              Google
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already grinding?{" "}
              <Link href="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                Welcome back! 👋
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
