"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SiteLayout from "@/components/site-layout"

export default function About() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-semibold text-purple-900 mb-8 text-center">About Skin Insight</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Skin Insight, we're committed to leveraging cutting-edge AI technology to empower individuals in their
                  skin health journey. Our mission is to provide accessible, accurate, and timely information about
                  potential skin conditions, promoting early detection and encouraging proactive healthcare.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Team</h2>
                <p className="text-gray-700 leading-relaxed">
                  We are a diverse team of dermatologists, AI specialists, and software engineers working together to bring
                  you the most advanced skin disease detection technology.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Our Technology</h2>
                <p className="text-gray-700 leading-relaxed">
                  Skin Insight uses state-of-the-art machine learning algorithms trained on vast datasets of skin
                  conditions. Our AI model is continuously improving, learning from new data to provide increasingly
                  accurate results. However, we always emphasize that our technology is a tool to assist, not replace,
                  professional medical advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  Have questions or feedback? We'd love to hear from you. Reach out to us at{" "}
                  <a href="mailto:contact@skininsight.com" className="text-purple-600 hover:underline">
                    contact@skininsight.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

