"use client"

import type React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {children}
    </Link>
  )
}

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex gap-6 md:gap-10">
            <Link href="/ai-detector" className="flex items-center space-x-2">
              <Image 
                src="/logo.png"
                alt="DeepSkin Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="inline-block font-bold text-purple-900">DeepSkin</span>
            </Link>
            <nav className="hidden md:flex gap-8 ml-8">
              <NavItem href="/ai-detector">AI Detector</NavItem>
              <NavItem href="/schedule-appointment">Schedule Appointment</NavItem>
              <NavItem href="/skin-guide">Skin Guide</NavItem>
              <NavItem href="/about">About</NavItem>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleSignOut} className="text-purple-900 border-purple-200 hover:bg-purple-50">
              Sign Out
            </Button>
          </div>
          {/* Mobile Navigation */}
          <div className="flex md:hidden ml-auto">
            <button className="p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu (can be expanded) */}
        <div className="md:hidden">{/* Add mobile menu items here if needed */}</div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              © {new Date().getFullYear()} Skin Insight. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4">
            <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default SiteLayout

