import React, { useState } from 'react';

export default function SendMessageButton({ caption, numbers }) {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage(null);

    if (!numbers || numbers.length === 0) {
      setError('No WhatsApp numbers available to send.');
      setLoading(false);
      return;
    }

    if (!caption || caption.trim() === '') {
      setError('No caption available to send.');
      setLoading(false);
      return;
    }

    try {
      for (const number of numbers) {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ number: number.trim(), prompt: caption })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage = errorData?.error || `Failed to send message to ${number}`;
          throw new Error(errorMessage);
        }
      }
      setResponseMessage('Message sent to all numbers.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto mt-6 border border-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-green-700">Send WhatsApp Message</h2>
      <button
        onClick={handleSendMessage}
        disabled={loading || !caption || caption.trim() === '' || !numbers || numbers.length === 0}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending WhatsApp...' : 'Send WhatsApp'}
      </button>
      {error && <div className="mt-3 p-2 bg-red-200 text-red-800 rounded">{error}</div>}
      {responseMessage && <div className="mt-3 p-2 bg-green-200 text-green-800 rounded">{responseMessage}</div>}
    </div>
  );
}
