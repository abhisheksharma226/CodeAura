"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function CompanyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Welcome to <span className="text-primary">TrackMyDSA</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your personal coding companion to track, analyze, and showcase your DSA journey — all in one place.
          </p>
          <Button size="lg" className="text-base px-8">
            Start Tracking Now
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="company" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">About TrackMyDSA</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">Why We Built This</h3>
                <p className="text-muted-foreground mb-4">
                  TrackMyDSA helps you maintain consistency, measure progress, and organize your problem-solving practice across platforms like LeetCode, GFG, and HackerRank.
                </p>
                <p className="text-muted-foreground mb-4">
                  With smart notes, streak tracking, and visual dashboards, you can focus more on learning and less on organizing.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Track Problems & Progress
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Sync Your Practice Across Platforms
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Smart Notes and Daily Goals
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Showcase Your DSA Portfolio
                  </li>
                </ul>
              </div>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Our Mission</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    To empower aspiring developers and students to stay consistent, learn effectively, and build their coding portfolios with ease.
                  </p>
                  <h4 className="font-semibold mb-4">Vision</h4>
                  <p className="text-sm text-muted-foreground">
                    Create the most intuitive and developer-friendly DSA tracker used by millions to land their dream tech jobs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section id="github" className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <Github className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Open Source, Open Growth</h2>
            <p className="text-muted-foreground mb-8">
              Built for the community, by the community. Explore our codebase, contribute features, or fork your own version.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/abhisheksharma226/CodeAura" target="_blank">
                <Github className="w-4 h-4 mr-2" />
                Contribute on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <span>avisheksharma2004@gmail.com</span>
                  </div>
                  {/* <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <span>+91 98765 43210</span>
                  </div> */}
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <span>Dhanbad | Remote-First</span>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={4} />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Privacy Policy</h2>
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-lg font-semibold mb-3">Data We Store</h3>
                  <p className="text-muted-foreground mb-4">
                    We store your notes, practice logs, and DSA performance securely. You control what is visible publicly.
                  </p>

                  <h3 className="text-lg font-semibold mb-3">Security</h3>
                  <p className="text-muted-foreground mb-4">
                    Your data is encrypted and stored with best practices. We don’t share or sell your information.
                  </p>

                  <h3 className="text-lg font-semibold mb-3">Transparency</h3>
                  <p className="text-muted-foreground mb-4">
                    We’re open about how we use your data and are committed to keeping your trust.
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Last updated: July 2025. Email privacy@trackmydsa.com for any concerns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
