"use client"

import Link from "next/link"
import SiteLayout from "@/components/site-layout"
import { Button } from "@/components/ui/button"

export default function Results() {
  const mockResult = {
    condition: "Eczema",
    confidence: 0.85,
    description: "Eczema is a condition where patches of skin become inflamed, itchy, red, cracked, and rough.",
    nextSteps: [
      "Keep the affected area moisturized",
      "Avoid known triggers (e.g., certain soaps, detergents, or foods)",
      "Consider using over-the-counter hydrocortisone cream",
      "Consult with a dermatologist for personalized treatment",
    ],
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Analysis Results</h1>

        <div className="max-w-2xl mx-auto bg-muted p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Detected Condition</h2>
            <p className="text-xl">{mockResult.condition}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Confidence</h2>
            <div className="w-full bg-muted-foreground/20 rounded-full h-4">
              <div className="bg-primary rounded-full h-4" style={{ width: `${mockResult.confidence * 100}%` }}></div>
            </div>
            <p className="mt-2 text-muted-foreground">{(mockResult.confidence * 100).toFixed(1)}% confidence</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{mockResult.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Recommended Next Steps</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {mockResult.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Remember, this analysis is for informational purposes only and does not replace professional medical
              advice.
            </p>
            <Link href="/schedule-appointment">
              <Button>Schedule an Appointment</Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

