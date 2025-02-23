"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import SiteLayout from "@/components/site-layout"
import { Button } from "@/components/ui/button"

interface AnalysisResult {
  condition: string
  confidence: number
  description: string
  nextSteps: string[]
}

export default function Results() {
  const [result, setResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    const storedResult = localStorage.getItem('analysisResult')
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    }
  }, [])

  if (!result) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">No Analysis Results Available</h1>
          <div className="text-center">
            <Link href="/ai-detector">
              <Button>Start New Analysis</Button>
            </Link>
          </div>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Analysis Results</h1>

        <div className="max-w-2xl mx-auto bg-muted p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Detected Condition</h2>
            <p className="text-xl">{result.condition}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Confidence</h2>
            <div className="w-full bg-muted-foreground/20 rounded-full h-4">
              <div 
                className="bg-primary rounded-full h-4" 
                style={{ width: `${result.confidence * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-muted-foreground">
              {(result.confidence * 100).toFixed(1)}% confidence
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{result.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Recommended Next Steps</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {result.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Remember, this analysis is for informational purposes only and does not replace professional medical advice.
            </p>
            <div className="space-x-4">
              <Link href="/ai-detector">
                <Button variant="outline">Analyze Another Image</Button>
              </Link>
              <Link href="/schedule-appointment">
                <Button>Schedule an Appointment</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

