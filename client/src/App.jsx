import React, { useState } from 'react'
import ProductForm from './components/ProductForm'
import CaptionCard from './components/CaptionCard'
import SendMessageButton from './components/SendMessageButton'
import SendSmsButton from './components/SendSmsButton'

export default function App() {
  const [captions, setCaptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [numbers, setNumbers] = useState([])

  const generateAndSend = async (productData) => {
    setLoading(true)
    setError(null)
    setCaptions([])
    setNumbers([])

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/generate-and-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.error || 'Failed to fetch captions from backend'
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setCaptions(data.captions || [])
      setNumbers(productData.numbers || [])
    } catch (err) {
      setError(err.message)
      setCaptions([err.message])
      setNumbers(productData.numbers || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-semibold">
        UMKMBoost – Bantu Jualanmu Lebih Cerdas!
      </header>

      <main className="flex-grow container mx-auto p-4 max-w-md">
        <ProductForm onGenerate={generateAndSend} loading={loading} />

        {error && (
          <div className="mt-4 p-3 bg-red-200 text-red-800 rounded">
            Error: {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          {captions.map((caption, index) => (
            <CaptionCard key={index} text={caption} />
          ))}
        </div>

        <SendMessageButton caption={captions[0] || ''} numbers={numbers} />
        <SendSmsButton message={captions[0] || ''} numbers={numbers} />
      </main>

      <footer className="bg-gray-200 text-center text-sm p-2 text-gray-600">
        Powered by AI
      </footer>
    </div>
  )
}
