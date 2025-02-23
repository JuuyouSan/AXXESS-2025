"use client"

import { useState, useCallback } from "react"
import SiteLayout from "@/components/site-layout"
import {
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GoogleMapsWrapper from "@/components/google-maps-wrapper"

interface Location {
  lat: number
  lng: number
}

interface Dermatologist {
  id: string
  name: string
  vicinity: string
  rating: number
  location: Location
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
}

export default function ScheduleAppointment() {
  const [center, setCenter] = useState<Location>(defaultCenter)
  const [address, setAddress] = useState("")
  const [dermatologists, setDermatologists] = useState<Dermatologist[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Dermatologist | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchNearbyDermatologists = useCallback(async (location: Location) => {
    try {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      )

      const request = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: 5000, // 5km radius
        type: "doctor",
        keyword: "dermatologist",
      }

      service.nearbySearch(
        request,
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const highlyRated = results
              .filter((place) => (place.rating || 0) >= 4.0)
              .map((place) => ({
                id: place.place_id!,
                name: place.name!,
                vicinity: place.vicinity!,
                rating: place.rating!,
                location: {
                  lat: place.geometry!.location!.lat(),
                  lng: place.geometry!.location!.lng(),
                },
              }))
            setDermatologists(highlyRated)
          } else {
            setError("No dermatologists found in this area")
          }
        }
      )
    } catch (error) {
      setError("Error searching for dermatologists")
    }
  }, [])

  const handleAddressSearch = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const geocoder = new window.google.maps.Geocoder()
      
      const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0])
          } else {
            reject(new Error("Address not found"))
          }
        })
      })

      const location = {
        lat: result.geometry?.location?.lat() || 0,
        lng: result.geometry?.location?.lng() || 0,
      }
      
      setCenter(location)
      await searchNearbyDermatologists(location)
    } catch (error) {
      setError("Error finding address")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLocateMe = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCenter(location)
        await searchNearbyDermatologists(location)
        setIsLoading(false)
      },
      () => {
        setError("Unable to get your location")
        setIsLoading(false)
      }
    )
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-semibold text-purple-900 mb-4 text-center">
              Schedule an Appointment
            </h1>

            <p className="mb-8 text-center text-gray-700">
              Find highly-rated dermatologists near you and schedule an appointment
              for professional diagnosis and treatment.
            </p>

            <div className="mb-6 flex gap-4">
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAddressSearch}
                disabled={isLoading || !address}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Search
              </Button>
              <Button
                onClick={handleLocateMe}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Locate Me
              </Button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="mb-8 rounded-xl overflow-hidden shadow-md">
              <GoogleMapsWrapper>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={13}
                >
                  {dermatologists.map((doctor) => (
                    <Marker
                      key={doctor.id}
                      position={doctor.location}
                      onClick={() => setSelectedDoctor(doctor)}
                    />
                  ))}
                  {selectedDoctor && (
                    <InfoWindow
                      position={selectedDoctor.location}
                      onCloseClick={() => setSelectedDoctor(null)}
                    >
                      <div className="p-2">
                        <h3 className="font-semibold">{selectedDoctor.name}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedDoctor.vicinity}
                        </p>
                        <p className="text-sm text-yellow-600">
                          Rating: {selectedDoctor.rating} ⭐
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </GoogleMapsWrapper>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">
                Nearby Dermatologists
              </h2>
              {dermatologists.length > 0 ? (
                <ul className="space-y-4">
                  {dermatologists.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="text-xl font-semibold text-purple-900">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-700 mt-2">{doctor.vicinity}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-600">
                          Rating: {doctor.rating} ⭐
                        </span>
                      </div>
                      <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                        Schedule Appointment
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-600">
                  Search for dermatologists in your area using the search bar or
                  location button above.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

