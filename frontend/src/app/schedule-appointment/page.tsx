"use client"

import SiteLayout from "@/components/site-layout"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.75rem",
}

const center = {
  lat: 40.7128,
  lng: -74.006,
}

const dermatologists = [
  { name: "Dr. Smith", lat: 40.715, lng: -74.007 },
  { name: "Dr. Johnson", lat: 40.711, lng: -74.005 },
  { name: "Dr. Williams", lat: 40.714, lng: -74.008 },
]

export default function ScheduleAppointment() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-semibold text-purple-900 mb-4 text-center">Schedule an Appointment</h1>
            
            <p className="mb-8 text-center text-gray-700">
              Find dermatologists near you and schedule an appointment for professional diagnosis and treatment.
            </p>

            <div className="mb-8 rounded-xl overflow-hidden shadow-md">
              <LoadScript googleMapsApiKey="">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                  {dermatologists.map((doctor, index) => (
                    <Marker key={index} position={{ lat: doctor.lat, lng: doctor.lng }} title={doctor.name} />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">Nearby Dermatologists</h2>
              <ul className="space-y-4">
                {dermatologists.map((doctor, index) => (
                  <li key={index} className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                    <h3 className="text-xl font-semibold text-purple-900">{doctor.name}</h3>
                    <p className="text-gray-700 mt-2">123 Main St, New York, NY 10001</p>
                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Schedule Appointment
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

