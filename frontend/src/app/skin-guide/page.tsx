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
  {
    name: "Actinic Keratosis",
    description: "A rough, scaly patch on the skin caused by long-term sun exposure, and it may be a precursor to skin cancer.",
    symptoms: [
      "Rough, dry, or scaly patches",
      "Flat to slightly raised patches",
      "Pink, red, or brown coloration",
      "Itching or burning sensation"
    ],
    treatments: [
      "Topical medications",
      "Cryotherapy (freezing)",
      "Photodynamic therapy",
      "Regular skin examinations"
    ],
  },
  {
    name: "Benign Tumors",
    description: "Non-cancerous growths on the skin that are generally harmless but may be removed for cosmetic reasons or if they cause discomfort.",
    symptoms: [
      "Raised or flat growths",
      "Smooth or irregular surface",
      "Various colors and sizes",
      "May be painless"
    ],
    treatments: [
      "Regular monitoring",
      "Surgical removal if desired",
      "Laser therapy",
      "Cryotherapy"
    ],
  },
  {
    name: "Bullous Disorders",
    description: "Conditions characterized by the formation of fluid-filled blisters (bullae) on the skin.",
    symptoms: [
      "Large fluid-filled blisters",
      "Itching or burning sensation",
      "Skin tenderness",
      "Redness around blisters"
    ],
    treatments: [
      "Corticosteroids",
      "Immunosuppressive medications",
      "Wound care",
      "Protective bandaging"
    ],
  },
  {
    name: "Candidiasis",
    description: "A fungal infection that causes red, itchy rashes, typically in warm and moist areas of the body.",
    symptoms: [
      "Red, itchy rash",
      "White or yellow discharge",
      "Burning sensation",
      "Skin breakdown"
    ],
    treatments: [
      "Antifungal medications",
      "Keeping affected areas dry",
      "Good hygiene practices",
      "Avoiding irritants"
    ],
  },
  {
    name: "Drug Eruption",
    description: "Adverse skin reactions resulting from medications, often presenting as rashes or hives.",
    symptoms: [
      "Sudden rash development",
      "Itching or burning",
      "Skin redness",
      "Possible blistering"
    ],
    treatments: [
      "Discontinuing triggering medication",
      "Antihistamines",
      "Topical corticosteroids",
      "Medical evaluation"
    ],
  },
  {
    name: "Infestations and Bites",
    description: "Skin reactions resulting from insect bites or parasitic infestations.",
    symptoms: [
      "Itching and redness",
      "Raised bumps or welts",
      "Skin irritation",
      "Possible secondary infection"
    ],
    treatments: [
      "Antiparasitic medications",
      "Anti-itch creams",
      "Proper cleaning",
      "Prevention measures"
    ],
  },
  {
    name: "Lichen Planus",
    description: "An inflammatory condition affecting the skin and mucous membranes, characterized by purplish, itchy, flat-topped bumps.",
    symptoms: [
      "Purple, itchy bumps",
      "White lines on mucous membranes",
      "Scalp inflammation",
      "Nail changes"
    ],
    treatments: [
      "Topical corticosteroids",
      "Oral medications",
      "UV light therapy",
      "Stress management"
    ],
  },
  {
    name: "Lupus",
    description: "An autoimmune disease that can cause inflammation and rashes on the skin, particularly on sun-exposed areas.",
    symptoms: [
      "Butterfly-shaped rash on face",
      "Skin sensitivity to sunlight",
      "Red, scaly patches",
      "Hair loss"
    ],
    treatments: [
      "Sun protection",
      "Immunosuppressive medications",
      "Topical treatments",
      "Lifestyle modifications"
    ],
  },
  {
    name: "Moles",
    description: "Common skin growths that can be flat or raised, typically brown in color, and usually harmless.",
    symptoms: [
      "Round or oval spots",
      "Brown, black, or flesh-colored",
      "Uniform or irregular shape",
      "May change over time"
    ],
    treatments: [
      "Regular monitoring",
      "Professional skin checks",
      "Surgical removal if suspicious",
      "Documentation of changes"
    ],
  },
  {
    name: "Rosacea",
    description: "A chronic inflammatory skin condition causing redness and visible blood vessels in the face.",
    symptoms: [
      "Facial redness",
      "Visible blood vessels",
      "Bumps and pimples",
      "Skin sensitivity"
    ],
    treatments: [
      "Topical medications",
      "Oral antibiotics",
      "Laser therapy",
      "Trigger avoidance"
    ],
  },
  {
    name: "Seborrheic Keratosis",
    description: "Common benign skin growths that often appear during middle age, resembling stuck-on warts.",
    symptoms: [
      "Waxy, scaly growths",
      "Brown, black, or tan color",
      "Raised, 'stuck-on' appearance",
      "Various sizes"
    ],
    treatments: [
      "Cryotherapy",
      "Curettage",
      "Laser treatment",
      "Regular monitoring"
    ],
  },
  {
    name: "Skin Cancer",
    description: "Abnormal growth of skin cells, typically developing on sun-exposed skin, with several types including melanoma, basal cell, and squamous cell carcinoma.",
    symptoms: [
      "New or changing moles",
      "Unusual growths",
      "Non-healing sores",
      "Changes in skin appearance"
    ],
    treatments: [
      "Surgical removal",
      "Radiation therapy",
      "Chemotherapy",
      "Immunotherapy"
    ],
  },
  {
    name: "Sun/Sunlight Damage",
    description: "Harmful effects of UV exposure on the skin, leading to premature aging and increased risk of skin cancer.",
    symptoms: [
      "Wrinkles and fine lines",
      "Age spots",
      "Uneven skin tone",
      "Dry, rough texture"
    ],
    treatments: [
      "Daily sunscreen use",
      "Protective clothing",
      "Antioxidant treatments",
      "Skin repair products"
    ],
  },
  {
    name: "Tinea",
    description: "A common fungal infection, often known as ringworm, causing red, itchy, and sometimes circular rashes.",
    symptoms: [
      "Circular, red rashes",
      "Itching and burning",
      "Scaly or cracked skin",
      "Spreading rings"
    ],
    treatments: [
      "Antifungal medications",
      "Keeping skin dry",
      "Good hygiene practices",
      "Prevention of spread"
    ],
  },
  {
    name: "Vascular Tumors",
    description: "Benign growths made up of blood vessels that can appear on or under the skin, ranging from birthmarks to acquired lesions.",
    symptoms: [
      "Red or purple growths",
      "Raised or flat patches",
      "May be warm to touch",
      "Possible swelling"
    ],
    treatments: [
      "Laser therapy",
      "Surgical removal",
      "Medication for larger lesions",
      "Regular monitoring"
    ],
  },
  {
    name: "Vasculitis",
    description: "Inflammation of blood vessels that can cause skin changes, including rashes, spots, and ulcers.",
    symptoms: [
      "Red or purple spots",
      "Skin ulcers",
      "Rashes or lesions",
      "Tender or painful areas"
    ],
    treatments: [
      "Corticosteroids",
      "Immunosuppressive drugs",
      "Wound care",
      "Regular medical monitoring"
    ],
  },
  {
    name: "Vitiligo",
    description: "A condition where patches of skin lose their pigment, resulting in white patches on various parts of the body.",
    symptoms: [
      "White patches on skin",
      "Premature graying of hair",
      "Loss of color in mouth/eyes",
      "Patches that grow over time"
    ],
    treatments: [
      "Topical medications",
      "Light therapy",
      "Skin camouflage",
      "Depigmentation for extensive cases"
    ],
  },
  {
    name: "Warts",
    description: "Small, rough growths on the skin caused by viral infections, particularly the human papillomavirus (HPV).",
    symptoms: [
      "Rough, raised bumps",
      "May have black dots",
      "Can be painful when pressed",
      "May appear in clusters"
    ],
    treatments: [
      "Cryotherapy",
      "Topical medications",
      "Laser treatment",
      "Surgical removal"
    ],
  }
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

