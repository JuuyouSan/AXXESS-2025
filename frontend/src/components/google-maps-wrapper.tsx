"use client"

import { useLoadScript, Libraries } from "@react-google-maps/api"
import { ReactNode } from "react"

const libraries: Libraries = ["places"]

interface GoogleMapsWrapperProps {
  children: ReactNode
}

export default function GoogleMapsWrapper({ children }: GoogleMapsWrapperProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  })

  if (loadError) {
    return <div className="text-red-600">Error loading maps: {loadError.message}</div>
  }

  if (!isLoaded) {
    return <div className="text-gray-600">Loading maps...</div>
  }

  return <>{children}</>
} 