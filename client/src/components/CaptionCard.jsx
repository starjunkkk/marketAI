import React from 'react'

export default function CaptionCard({ text }) {
  return (
    <div className="p-4 rounded shadow-md border-l-8 border-blue-600 bg-gradient-to-r from-blue-100 via-white to-orange-100">
      <p className="text-gray-800 font-medium whitespace-pre-line">{text}</p>
    </div>
  )
}
