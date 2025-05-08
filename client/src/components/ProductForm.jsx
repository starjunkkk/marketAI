import React, { useState } from 'react'

const categories = ['Makanan', 'Minuman', 'Pakaian', 'Aksesoris', 'Lainnya']

export default function ProductForm({ onGenerate, loading }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState('')
  const [fileNumbers, setFileNumbers] = useState([])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target.result
      // Parse CSV: split by new lines, then by commas, trim and filter numbers
      const lines = text.split(/\r?\n/)
      const nums = []
      lines.forEach(line => {
        line.split(',').forEach(num => {
          const trimmed = num.trim()
          if (trimmed.length > 0) {
            nums.push(trimmed)
          }
        })
      })
      setFileNumbers(nums)
    }
    reader.readAsText(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !price || isNaN(price)) {
      alert('Mohon isi Nama Produk dan Harga Produk dengan benar.')
      return
    }
    if (fileNumbers.length === 0) {
      alert('Mohon unggah minimal satu nomor WhatsApp dari file CSV.')
      return
    }
    onGenerate({ productName: name.trim(), price, category, description: description.trim(), numbers: fileNumbers })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold mb-1">
          Nama Produk
        </label>
        <input
          id="name"
          type="text"
          placeholder="Masukkan nama produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold mb-1">
          Harga Produk
        </label>
        <input
          id="price"
          type="number"
          placeholder="Masukkan harga produk"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          min="0"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block font-semibold mb-1">
          Kategori Produk
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-1">
          Deskripsi Produk
        </label>
        <textarea
          id="description"
          placeholder="Masukkan deskripsi produk untuk promosi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          rows={4}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="fileUpload" className="block font-semibold mb-1">
          Upload Daftar Kontak (CSV)
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          disabled={loading}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {fileNumbers.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            {fileNumbers.length} nomor berhasil diunggah dari file.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Membuat Caption...' : 'Buat Caption Promosi'}
      </button>
    </form>
  )
}
