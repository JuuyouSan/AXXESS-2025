"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState, useCallback } from "react"
import SiteLayout from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { useDropzone } from "react-dropzone"

export default function AIDetector() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type header manually when sending FormData
          // It will be set automatically with the correct boundary
        }
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      console.log('Upload successful:', data)
      router.push("/results")
    } catch (error) {
      console.error('Upload error:', error)
      // Handle error appropriately
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              AI Skin Disease Detector
            </h1>

            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit}>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer transition-colors duration-200 ${
                    isDragActive
                      ? "border-primary bg-pink-50"
                      : "border-muted-foreground hover:bg-purple-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  {previewUrl ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="mx-auto max-h-64 mb-4 rounded-lg"
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      Drag and drop an image here, or click to select a file
                    </p>
                  )}
                </div>

                {file && (
                  <p className="mb-4 text-center text-gray-600">
                    Selected file: <strong>{file.name}</strong>
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                  disabled={!file || isLoading}
                >
                  {isLoading ? "Processing..." : "Analyze Image"}
                </Button>
              </form>

              <div className="mt-8 bg-purple-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Guidelines for Best Results:
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Ensure the affected area is clearly visible and well-lit</li>
                  <li>
                    Take the photo from a close distance, but keep the entire area
                    in frame
                  </li>
                  <li>Avoid using filters or editing the image</li>
                  <li>
                    If possible, include a size reference (e.g., a coin) next to
                    the affected area
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

