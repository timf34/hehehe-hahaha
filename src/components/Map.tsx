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
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div style="color: #FF1493; padding: 8px;">
                    <h3 style="font-weight: bold; margin-bottom: 4px;">${location.name}</h3>
                    ${location.year ? `<p style="color: #FF69B4;">💕 ${location.year}</p>` : ''}
                </div>`
            )

            const marker = new mapboxgl.Marker({
                color: '#FF1493', // Hot pink for romance!
            })
                .setLngLat([location.longitude, location.latitude])
                .setPopup(popup)
                .addTo(map.current)

            markers.current.push(marker)
        })
    }, [])

    return (
        <div ref={mapContainer} className="w-full h-[70vh] rounded-lg" />
    )
}