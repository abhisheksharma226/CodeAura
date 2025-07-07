"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  BookOpen,
  Rocket,
  Download,
  Code,
  HelpCircle,
  Globe,
  ChevronRight,
  Copy,
  Check,
  Moon,
  Sun,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"
import { useTheme } from "next-themes"

const navigationItems = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "getting-started", label: "Getting Started", icon: Rocket },
  { id: "installation", label: "Installation", icon: Download },
  { id: "usage", label: "Usage", icon: Code },
  { id: "api-reference", label: "API Reference", icon: Code },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "deployment", label: "Deployment", icon: Globe },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ children, language = "bash", id }: { children: string; language?: string; id: string }) => (
    <div className="relative group">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-gray-300 px-3 py-1.5 rounded-t-lg text-sm">
        <span>{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(children, id)}
          className="h-6 px-2 text-gray-400 hover:text-white"
        >
          {copiedCode === id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </Button>
      </div>
      <pre className="bg-gray-900 dark:bg-black text-gray-100 p-3 rounded-b-lg overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  )

  const Alert = ({
    type = "info",
    children,
  }: { type?: "info" | "warning" | "success" | "error"; children: React.ReactNode }) => {
    const styles = {
      info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
      warning:
        "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
      success:
        "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
      error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    }

    const icons = {
      info: Info,
      warning: AlertCircle,
      success: CheckCircle,
      error: AlertCircle,
    }

    const Icon = icons[type]

    return (
      <div className={`border rounded-lg p-3 ${styles[type]}`}>
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="text-sm">{children}</div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Documentation Overview</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Welcome to our comprehensive documentation. Learn how to integrate and use our platform effectively.
              </p>
            </div>

            <Alert type="info">
              <strong>New to our platform?</strong> Start with the Getting Started guide to set up your first project in
              minutes.
            </Alert>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-blue-600" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Get up and running in under 5 minutes with our quick start guide.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveSection("getting-started")}
                    className="w-full"
                  >
                    Get Started <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-600" />
                    API Reference
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Comprehensive API documentation with examples and response formats.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveSection("api-reference")}
                    className="w-full"
                  >
                    View API Docs <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What's Included</h2>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Installation Guide</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Usage Examples</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">API Reference</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Deployment Guide</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">FAQ Section</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Best Practices</span>
                </div>
              </div>
            </div>
          </div>
        )

      case "getting-started":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Getting Started</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Follow this guide to set up your development environment and create your first project.
              </p>
            </div>

            <Alert type="success">
              <strong>Prerequisites:</strong> Make sure you have Node.js 18+ and npm/yarn installed on your system.
            </Alert>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Step 1: Create a New Project</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Start by creating a new project using our CLI tool:
              </p>
              <CodeBlock language="bash" id="create-project">
                {`npx create-my-app my-project
cd my-project
npm install`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Step 2: Configure Environment
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Create a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">.env.local</code> file
                in your project root:
              </p>
              <CodeBlock language="bash" id="env-config">
                {`# .env.local
API_KEY=your_api_key_here
DATABASE_URL=your_database_url
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Step 3: Start Development Server
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Run the development server to see your app in action:
              </p>
              <CodeBlock language="bash" id="dev-server">
                {`npm run dev
# or
yarn dev`}
              </CodeBlock>
              <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
                Open{" "}
                <a href="http://localhost:3000" className="text-blue-600 dark:text-blue-400 hover:underline">
                  http://localhost:3000
                </a>{" "}
                in your browser to see the result.
              </p>
            </div>

            <Alert type="info">
              <strong>Next Steps:</strong> Now that you have a basic setup, check out the Usage section to learn about
              core features and functionality.
            </Alert>
          </div>
        )

      case "installation":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Installation</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Multiple ways to install and integrate our platform into your project.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Package Manager</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Install using your preferred package manager:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">npm</h3>
                  <CodeBlock language="bash" id="npm-install">
                    {`npm install @mycompany/sdk`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">yarn</h3>
                  <CodeBlock language="bash" id="yarn-install">
                    {`yarn add @mycompany/sdk`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">pnpm</h3>
                  <CodeBlock language="bash" id="pnpm-install">
                    {`pnpm add @mycompany/sdk`}
                  </CodeBlock>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CDN Installation</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                For quick prototyping, you can include our SDK via CDN:
              </p>
              <CodeBlock language="html" id="cdn-install">
                {`<script src="https://cdn.mycompany.com/sdk/v1.0.0/sdk.min.js"></script>`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Verification</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Verify your installation by checking the version:
              </p>
              <CodeBlock language="javascript" id="verify-install">
                {`import { version } from '@mycompany/sdk'
console.log('SDK Version:', version)`}
              </CodeBlock>
            </div>

            <Alert type="warning">
              <strong>Version Compatibility:</strong> Make sure you're using Node.js 18+ for the best compatibility with
              our SDK.
            </Alert>
          </div>
        )

      case "usage":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Usage</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Learn how to use our platform's core features with practical examples.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Basic Setup</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Initialize the SDK in your application:</p>
              <CodeBlock language="javascript" id="basic-setup">
                {`import { MySDK } from '@mycompany/sdk'

const client = new MySDK({
  apiKey: process.env.API_KEY,
  environment: 'production' // or 'development'
})

export default client`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Making API Calls</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Here's how to make your first API call:</p>
              <CodeBlock language="javascript" id="api-calls">
                {`// Fetch user data
const user = await client.users.get('user-id')

// Create a new resource
const newResource = await client.resources.create({
  name: 'My Resource',
  description: 'A sample resource'
})

// Update existing resource
const updatedResource = await client.resources.update('resource-id', {
  name: 'Updated Resource Name'
})`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Handling</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Implement proper error handling for robust applications:
              </p>
              <CodeBlock language="javascript" id="error-handling">
                {`try {
  const result = await client.api.call()
  console.log('Success:', result)
} catch (error) {
  if (error.status === 401) {
    console.error('Authentication failed')
  } else if (error.status === 429) {
    console.error('Rate limit exceeded')
  } else {
    console.error('API Error:', error.message)
  }
}`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Configuration Options</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Available configuration options:</p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Option</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Type</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Default</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        apiKey
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">string</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">-</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Your API key for authentication
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        environment
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">string</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">production</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Environment to connect to
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        timeout
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">number</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">5000</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Request timeout in milliseconds
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        retries
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">number</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">3</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Number of retry attempts
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Alert type="info">
              <strong>Pro Tip:</strong> Use environment variables to manage different configurations for development,
              staging, and production environments.
            </Alert>
          </div>
        )

      case "api-reference":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">API Reference</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Complete reference for all available API endpoints and methods.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Authentication</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                All API requests require authentication using your API key:
              </p>
              <CodeBlock language="bash" id="auth-example">
                {`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.mycompany.com/v1/users`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Users API</h2>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">GET /users</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Retrieve a list of users.</p>

                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Parameters</h4>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <ul className="space-y-2 text-sm">
                          <li>
                            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">limit</code> (optional) -
                            Number of users to return (default: 10)
                          </li>
                          <li>
                            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">offset</code> (optional) -
                            Number of users to skip (default: 0)
                          </li>
                          <li>
                            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">search</code> (optional) -
                            Search query for user names
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response</h4>
                      <CodeBlock language="json" id="users-response">
                        {`{
  "data": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0
  }
}`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">POST /users</h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Create a new user.</p>

                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Request Body</h4>
                      <CodeBlock language="json" id="create-user-request">
                        {`{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user"
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response</h4>
                      <CodeBlock language="json" id="create-user-response">
                        {`{
  "id": "user_456",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user",
  "created_at": "2024-01-15T11:00:00Z"
}`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Responses</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">All errors follow a consistent format:</p>
              <CodeBlock language="json" id="error-response">
                {`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Rate Limiting</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                API requests are limited to 1000 requests per hour per API key. Rate limit information is included in
                response headers:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">X-RateLimit-Limit</code> -
                  Request limit per hour
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">X-RateLimit-Remaining</code>{" "}
                  - Remaining requests
                </li>
                <li>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">X-RateLimit-Reset</code> -
                  Time when limit resets
                </li>
              </ul>
            </div>
          </div>
        )

      case "faq":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Common questions and answers about our platform.
              </p>
            </div>

            <div className="space-y-3">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">How do I get an API key?</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    You can generate an API key from your dashboard after creating an account. Navigate to Settings →
                    API Keys and click "Generate New Key". Make sure to store it securely as it won't be shown again.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">What are the rate limits?</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Rate limits depend on your plan:</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Free:</strong> 100 requests per hour
                    </li>
                    <li>
                      <strong>Pro:</strong> 1,000 requests per hour
                    </li>
                    <li>
                      <strong>Enterprise:</strong> 10,000 requests per hour
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">How do I handle authentication errors?</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Authentication errors (401) typically occur when:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-2">
                    <li>Your API key is invalid or expired</li>
                    <li>The API key is not included in the request headers</li>
                    <li>The API key doesn't have sufficient permissions</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300">
                    Double-check your API key and ensure it's properly formatted in the Authorization header.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Can I use this in production?</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes! Our API is production-ready and used by thousands of applications. We maintain 99.9% uptime and
                    provide 24/7 support for Pro and Enterprise customers. Make sure to follow our security best
                    practices and use environment variables for API keys.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">How do I report bugs or request features?</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    You can report bugs or request features through our GitHub repository or by contacting our support
                    team at support@mycompany.com. Please include as much detail as possible, including error messages
                    and steps to reproduce.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Is there a SDK for my programming language?</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">We currently provide official SDKs for:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Badge variant="secondary">JavaScript/Node.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">PHP</Badge>
                    <Badge variant="secondary">Ruby</Badge>
                    <Badge variant="secondary">Go</Badge>
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">C#</Badge>
                    <Badge variant="secondary">Swift</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    Don't see your language? You can still use our REST API directly or request a new SDK.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert type="info">
              <strong>Still have questions?</strong> Contact our support team at{" "}
              <a href="mailto:support@mycompany.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                support@mycompany.com
              </a>{" "}
              or check our{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                community forum
              </a>
              .
            </Alert>
          </div>
        )

      case "deployment":
        return (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Deployment</h1>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Deploy your application to production with confidence using our deployment guides.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vercel Deployment</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Deploy to Vercel with zero configuration:
              </p>
              <CodeBlock language="bash" id="vercel-deploy">
                {`# Install Vercel CLI
npm i -g vercel

# Deploy your project
vercel

# Set environment variables
vercel env add API_KEY
vercel env add DATABASE_URL`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Docker Deployment</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Use Docker for containerized deployments:
              </p>
              <CodeBlock language="dockerfile" id="dockerfile">
                {`FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]`}
              </CodeBlock>

              <p className="text-base text-gray-600 dark:text-gray-300 mt-4 mb-4">
                Build and run the Docker container:
              </p>
              <CodeBlock language="bash" id="docker-commands">
                {`# Build the image
docker build -t my-app .

# Run the container
docker run -p 3000:3000 -e API_KEY=your_key my-app`}
              </CodeBlock>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Environment Variables</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Required environment variables for production:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Variable</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Required</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        API_KEY
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">Yes</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Your production API key
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        DATABASE_URL
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">Yes</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Database connection string
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        NEXT_PUBLIC_APP_URL
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">Yes</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Your application's public URL
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 font-mono text-sm">
                        NODE_ENV
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">No</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-3 py-1.5">
                        Set to 'production' for optimizations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Health Checks</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Implement health checks for monitoring:</p>
              <CodeBlock language="javascript" id="health-check">
                {`// pages/api/health.js
export default function handler(req, res) {
  // Check database connection
  // Check external services
  // Return status
  
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  })
}`}
              </CodeBlock>
            </div>

            <Alert type="warning">
              <strong>Security Reminder:</strong> Never commit API keys or sensitive data to version control. Always use
              environment variables and secure secret management.
            </Alert>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Monitoring</h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                Set up monitoring and logging for production applications:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use application performance monitoring (APM) tools</li>
                <li>Set up error tracking and alerting</li>
                <li>Monitor API response times and error rates</li>
                <li>Implement structured logging</li>
                <li>Set up uptime monitoring</li>
              </ul>
            </div>
          </div>
        )

      default:
        return <div>Section not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Documentation</h1>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-2 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ExternalLink className="w-4 h-4" />
                <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">
                  API Status
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-4xl mx-auto px-3 py-4 lg:px-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
