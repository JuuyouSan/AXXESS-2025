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
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">No Analysis Results Available</h1>
              <div className="text-center">
                <Link href="/ai-detector">
                  <Button className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
                    Start New Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
              Analysis Results
            </h1>

            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-900">Detected Condition</h2>
                <p className="text-xl text-gray-800">{result.condition}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-900">Confidence</h2>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-purple-600 rounded-full h-4 transition-all duration-500" 
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-gray-600">
                  {(result.confidence * 100).toFixed(1)}% confidence
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-900">Description</h2>
                <p className="text-gray-700 leading-relaxed">{result.description}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-900">Recommended Next Steps</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {result.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Remember, this analysis is for informational purposes only and does not replace professional medical advice.
                </p>
                <div className="space-x-4">
                  <Link href="/ai-detector">
                    <Button variant="outline" className="border-purple-200 text-purple-900 hover:bg-purple-50">
                      Analyze Another Image
                    </Button>
                  </Link>
                  <Link href="/schedule-appointment">
                    <Button className="bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
                      Schedule an Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

