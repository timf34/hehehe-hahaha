'use client'

import Map from '@/components/Map'

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.2)_0%,transparent_60%)] before:animate-[spin_20s_linear_infinite] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_70%,rgba(255,182,193,0.15)_0%,transparent_50%)] after:animate-[spin_15s_linear_reverse_infinite]">
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