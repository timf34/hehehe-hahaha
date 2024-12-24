'use client'

import Map from '@/components/Map'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-pink-100 to-rose-100">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-rose-600 mb-6 flex items-center gap-2">
          Hehehe Hahaha 👀
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-4">
          <Map />
        </div>
      </div>
    </main>
  )
}