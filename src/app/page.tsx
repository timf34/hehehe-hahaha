'use client'

import Map from '@/components/Map'

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      {/* Decorative clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left cloud */}
        <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-gradient-to-br from-pink-100/60 to-rose-200/60 rounded-full blur-3xl" />
        
        {/* Top right cloud */}
        <div className="absolute -top-40 right-0 w-[45rem] h-[45rem] bg-gradient-to-bl from-pink-100/50 to-rose-100/50 rounded-full blur-3xl" />
        
        {/* Bottom cloud */}
        <div className="absolute bottom-0 left-1/3 w-[50rem] h-[50rem] bg-gradient-to-tr from-pink-100/40 to-rose-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto p-6 relative">
        <h1 className="text-3xl font-bold text-rose-600 mb-8 flex items-center justify-center gap-2">
          Hehehe Hahaha 👀
        </h1>
        <div className="p-8">
          <div className="gradient-shadow rounded-2xl">
            <div className="relative rounded-2xl bg-gradient-to-r from-pink-200 via-rose-300 to-pink-200 p-[2px]">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 h-[75vh]">
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}