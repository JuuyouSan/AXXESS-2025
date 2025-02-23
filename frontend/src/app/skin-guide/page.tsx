"use client"

import SiteLayout from "@/components/site-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const skinConditions = [
  {
    name: "Acne",
    description: "A skin condition that occurs when hair follicles become plugged with oil and dead skin cells.",
    symptoms: ["Whiteheads", "Blackheads", "Pimples", "Large, solid, painful lumps beneath the surface of the skin"],
    treatments: ["Over-the-counter topical treatments", "Prescription medications", "Chemical peels", "Light therapy"],
  },
  {
    name: "Eczema",
    description: "A condition that makes your skin red and itchy. It's common in children but can occur at any age.",
    symptoms: ["Dry, scaly skin", "Itching", "Red, inflamed skin", "Small, raised bumps which may leak fluid"],
    treatments: ["Moisturizing regularly", "Topical corticosteroids", "Oral medications", "Light therapy"],
  },
  {
    name: "Psoriasis",
    description: "A condition that causes skin cells to build up and form scales and itchy, dry patches.",
    symptoms: [
      "Red patches of skin covered with thick, silvery scales",
      "Small scaling spots",
      "Dry, cracked skin that may bleed",
      "Itching, burning or soreness",
    ],
    treatments: ["Topical treatments", "Light therapy", "Oral or injected medications"],
  },
]

export default function SkinGuide() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-semibold text-purple-900 mb-8 text-center">Skin Condition Guide</h1>
            
            <p className="text-gray-700 text-center mb-8">
              Learn about common skin conditions, their symptoms, and treatment options.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {skinConditions.map((condition, index) => (
                <AccordionItem 
                  value={`item-${index}`} 
                  key={index}
                  className="border border-purple-100 rounded-lg bg-purple-50/50 px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold text-purple-800 hover:text-purple-900 py-4">
                    {condition.name}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="mb-6 text-gray-700 leading-relaxed">{condition.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-purple-800 font-semibold mb-2">Common Symptoms:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {condition.symptoms.map((symptom, i) => (
                            <li key={i}>{symptom}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-purple-800 font-semibold mb-2">Treatments:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {condition.treatments.map((treatment, i) => (
                            <li key={i}>{treatment}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-8 text-sm text-center text-gray-600">
              Note: This guide is for informational purposes only. Please consult with a healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

