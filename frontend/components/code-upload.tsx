"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  File,
  Code,
  X,
  Play,
  Download,
  Copy,
  Check,
  Zap,
  Brain,
  Target,
  FileText,
  Code2,
  ImageIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CodeFile {
  id: string
  name: string
  language: string
  size: string
  content: string
  uploadedAt: string
}

export function CodeUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<CodeFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [problemTitle, setProblemTitle] = useState("")
  const [problemDescription, setProblemDescription] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [uploadType, setUploadType] = useState<"code" | "note" | "screenshot">("code")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const supportedLanguages = [
    { value: "python", label: "Python", ext: ".py", color: "bg-blue-500" },
    { value: "javascript", label: "JavaScript", ext: ".js", color: "bg-yellow-500" },
    { value: "java", label: "Java", ext: ".java", color: "bg-red-500" },
    { value: "cpp", label: "C++", ext: ".cpp", color: "bg-purple-500" },
    { value: "c", label: "C", ext: ".c", color: "bg-gray-600" },
    { value: "go", label: "Go", ext: ".go", color: "bg-cyan-500" },
    { value: "rust", label: "Rust", ext: ".rs", color: "bg-orange-600" },
    { value: "typescript", label: "TypeScript", ext: ".ts", color: "bg-blue-600" },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File too large! 📁",
          description: "Please upload files smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const newFile: CodeFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          language: getLanguageFromExtension(file.name),
          size: formatFileSize(file.size),
          content,
          uploadedAt: new Date().toISOString(),
        }

        setUploadedFiles((prev) => [...prev, newFile])
        toast({
          title: "File uploaded! 🚀",
          description: `${file.name} is ready for analysis`,
        })
      }
      reader.readAsText(file)
    })
  }

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase()
    const langMap: { [key: string]: string } = {
      py: "python",
      js: "javascript",
      java: "java",
      cpp: "cpp",
      c: "c",
      go: "go",
      rs: "rust",
      ts: "typescript",
    }
    return langMap[ext || ""] || "text"
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    toast({
      title: "Code copied! 📋",
      description: "Ready to paste anywhere!",
    })
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
    toast({
      title: "File removed! 🗑️",
      description: "File has been deleted from your uploads",
    })
  }

  const analyzeCode = (file: CodeFile) => {
    toast({
      title: "Analyzing code... 🧠",
      description: "AI is reviewing your solution for optimization tips!",
    })

    // Simulate analysis
    setTimeout(() => {
      toast({
        title: "Analysis complete! ✨",
        description: "Time complexity: O(n), Space: O(1). Great job!",
      })
    }, 2000)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card className="shadow-sm border rounded-lg bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-inter text-foreground">Upload Your Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <Button
              variant={uploadType === "code" ? "default" : "outline"}
              onClick={() => setUploadType("code")}
              size="sm"
              className="h-14 flex-col gap-1 rounded-lg text-xs"
            >
              <Code2 className="w-4 h-4" />
              Code Solution
            </Button>
            <Button
              variant={uploadType === "note" ? "default" : "outline"}
              onClick={() => setUploadType("note")}
              size="sm"
              className="h-14 flex-col gap-1 rounded-lg text-xs"
            >
              <FileText className="w-4 h-4" />
              Notes/PDF
            </Button>
            <Button
              variant={uploadType === "screenshot" ? "default" : "outline"}
              onClick={() => setUploadType("screenshot")}
              size="sm"
              className="h-14 flex-col gap-1 rounded-lg text-xs"
            >
              <ImageIcon className="w-4 h-4" />
              Screenshot
            </Button>
          </div>

          <form className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="problem-title" className="text-xs font-medium text-foreground">
                  Problem Title
                </Label>
                <Input
                  id="problem-title"
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  placeholder="e.g., Custom Binary Search Problem"
                  className="rounded-lg border text-sm h-8"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="platform" className="text-xs font-medium text-foreground">
                  Platform
                </Label>
                <select id="platform" className="w-full h-8 px-2 rounded-lg border border-input bg-background text-sm">
                  <option value="leetcode">LeetCode</option>
                  <option value="hackerrank">HackerRank</option>
                  <option value="codeforces">Codeforces</option>
                  <option value="geeksforgeeks">GeeksforGeeks</option>
                </select>
              </div>
            </div>

            {uploadType === "code" && (
              <div className="space-y-1">
                <Label htmlFor="code" className="text-xs font-medium text-foreground">
                  Code Solution
                </Label>
                <Textarea
                  id="code"
                  placeholder="Paste your code here..."
                  className="min-h-[120px] font-mono rounded-lg border text-sm"
                />
              </div>
            )}

            {uploadType === "note" && (
              <div className="space-y-1">
                <Label htmlFor="notes" className="text-xs font-medium text-foreground">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Write your approach, insights, or learnings..."
                  className="min-h-[100px] rounded-lg border text-sm"
                />
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="file-upload" className="text-xs font-medium text-foreground">
                {uploadType === "screenshot" ? "Upload Screenshot" : "Upload File (Optional)"}
              </Label>
              <div className="border border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Drag and drop your file here, or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file-upload"
                  multiple
                  accept={uploadType === "screenshot" ? "image/*" : "*"}
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 rounded-lg shadow-sm text-sm"
            >
              <Upload className="w-3 h-3 mr-1" />
              Upload {uploadType === "code" ? "Code" : uploadType === "note" ? "Notes" : "Screenshot"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="shadow-sm border rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-inter">
              <Code className="w-4 h-4 text-green-600" />
              Uploaded Solutions ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploadedFiles.map((file) => {
              const lang = supportedLanguages.find((l) => l.value === file.language)
              return (
                <div key={file.id} className="p-4 border rounded-lg bg-muted/30 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 ${lang?.color || "bg-gray-500"} rounded-lg flex items-center justify-center`}
                      >
                        <File className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold font-inter">{file.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="rounded-md text-xs">
                            {lang?.label || file.language}
                          </Badge>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => analyzeCode(file)}
                        className="rounded-lg bg-primary/10 hover:bg-primary/20 text-primary h-7 px-2 text-xs"
                      >
                        <Brain className="w-3 h-3 mr-1" />
                        AI Analyze
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(file.content, file.id)}
                        className="rounded-lg h-7 w-7 p-0"
                      >
                        {copiedId === file.id ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="bg-muted rounded-lg p-3 overflow-x-auto">
                    <pre className="text-xs text-foreground font-mono">
                      <code>
                        {file.content.slice(0, 300)}
                        {file.content.length > 300 ? "..." : ""}
                      </code>
                    </pre>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="outline" size="sm" className="rounded-lg bg-background text-xs h-7">
                      <Play className="w-3 h-3 mr-1" />
                      Run Code
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg bg-background text-xs h-7">
                      <Target className="w-3 h-3 mr-1" />
                      Test Cases
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg bg-background text-xs h-7">
                      <Zap className="w-3 h-3 mr-1" />
                      Optimize
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg bg-background text-xs h-7">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {/* AI Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-sm border rounded-lg bg-green-500/5 card-hover">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-semibold font-inter mb-2">AI Code Review</h3>
            <p className="text-xs text-muted-foreground">
              Get instant feedback on time/space complexity and optimization suggestions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border rounded-lg bg-primary/5 card-hover">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
              <Play className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-semibold font-inter mb-2">Code Execution</h3>
            <p className="text-xs text-muted-foreground">
              Run your code with custom test cases and see real-time output
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border rounded-lg bg-purple-500/5 card-hover">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-semibold font-inter mb-2">Smart Testing</h3>
            <p className="text-xs text-muted-foreground">Auto-generate edge cases and stress test your solutions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
