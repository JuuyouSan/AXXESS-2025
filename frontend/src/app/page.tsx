"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // For demo purposes, using admin/admin as default credentials
    if (isLogin) {
      if (username === "admin" && password === "admin") {
        // In a real app, you'd want to store this in an HTTP-only cookie
        localStorage.setItem("isAuthenticated", "true")
        router.push("/ai-detector")
      } else {
        setError("Invalid credentials. Try admin/admin for demo.")
      }
    } else {
      // In a real app, you'd want to make an API call to create the account
      localStorage.setItem("isAuthenticated", "true")
      router.push("/ai-detector")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50">
      <div className="w-[450px] p-8 rounded-lg bg-white shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-purple-900 mb-2">Welcome Back!</h1>
          <p className="text-xl text-gray-700">{isLogin ? "Sign into your account" : "Create your account"}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 py-6 bg-gray-50 border-0"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 py-6 bg-gray-50 border-0"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button 
            className="w-full py-6 bg-purple-900 hover:bg-purple-800 text-lg"
            type="submit"
          >
            {isLogin ? "Login" : "Register New Account"}
          </Button>

          {isLogin && (
            <p className="text-center text-gray-700">
              <button type="button" className="hover:underline">
                Forgot username or password?
              </button>
            </p>
          )}

          <p className="text-center text-gray-700">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="text-purple-900 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register New Account" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

