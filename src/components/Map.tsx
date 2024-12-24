'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { memoryLocations } from '@/data/hehehe'
import type { MemoryLocation } from '@/types'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const markers = useRef<mapboxgl.Marker[]>([])

    useEffect(() => {
        if (!mapContainer.current || map.current) return

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for romantic vibes
            center: [-6.2603, 53.3498], // Dublin center
            zoom: 12
        })

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        return () => {
            map.current?.remove()
        }
    }, [])

    useEffect(() => {
        if (!map.current) return

        // Clear existing markers
        markers.current.forEach(marker => marker.remove())
        markers.current = []

        memoryLocations.forEach((location: MemoryLocation) => {
            const popup = new mapboxgl.Popup({ 
                offset: 25,
                closeButton: true,
                closeOnClick: false
            }).setHTML(
                `<div class="text-pink-500 p-2">
                    <h3 class="font-bold mb-1 text-lg">${location.name}</h3>
                    ${location.year ? `<p class="text-pink-400">💕 ${location.year}</p>` : ''}
                </div>`
            )

            const marker = new mapboxgl.Marker({
                color: '#FF1493',
                clickTolerance: 3
            })
                .setLngLat([location.coordinates[1], location.coordinates[0]])
                .setPopup(popup)
                .addTo(map.current!)

            markers.current.push(marker)
        })
    }, [])

    return (
        <div ref={mapContainer} className="w-full h-[70vh] rounded-lg" />
    )
}