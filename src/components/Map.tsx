'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { memoryLocations } from '@/data/hehehe'
import type { MemoryLocation } from '@/types'

interface MemoryFeatureProperties {
    id: string;
    name: string;
    year?: string;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const popups = useRef<{ [key: string]: mapboxgl.Popup }>({})

    useEffect(() => {
        if (!mapContainer.current || map.current) return

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/timf34/cm51zgav200bu01r11gac6m64',
            center: [-6.2603, 53.3498],
            zoom: 12
        })

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        return () => {
            map.current?.remove()
        }
    }, [])

    useEffect(() => {
        if (!map.current) return

        // Convert memory locations to GeoJSON
        const geojson = {
            type: 'FeatureCollection',
            features: memoryLocations.map(location => ({
                type: 'Feature',
                properties: {
                    id: location.id,
                    name: location.name,
                    year: location.year
                },
                geometry: {
                    type: 'Point',
                    coordinates: [location.coordinates[1], location.coordinates[0]]
                }
            }))
        }

        const mapInstance = map.current as mapboxgl.Map;

        mapInstance.on('load', () => {
            // Add the source with clustering enabled
            mapInstance.addSource('memories', {
                type: 'geojson',
                data: geojson as any,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            })

            // Add cluster circles
            mapInstance.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'memories',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': '#FF1493',
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,    // radius when point count is less than 3
                        3,     // point count threshold
                        25,    // radius when point count is less than 7
                        7,     // point count threshold
                        30     // radius when point count is 7 or more
                    ],
                    'circle-opacity': 0.8
                }
            })

            // Add cluster count labels
            mapInstance.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'memories',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                },
                paint: {
                    'text-color': '#ffffff'
                }
            })

            // Add individual point markers
            mapInstance.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'memories',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#FF1493',
                    'circle-radius': 8,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                }
            })

            // Handle clicks on individual points
            mapInstance.on('click', 'unclustered-point', (e) => {
                if (!e.features?.[0]) return

                const coordinates = (e.features[0].geometry as any).coordinates.slice()
                const properties = e.features[0].properties as MemoryFeatureProperties
                const { id, name, year } = properties

                // Close any existing popups
                Object.values(popups.current).forEach(popup => popup.remove())

                // Create new popup
                const popup = new mapboxgl.Popup({
                    offset: 25,
                    closeButton: true,
                    closeOnClick: true
                })
                    .setLngLat(coordinates)
                    .setHTML(
                        `<div class="text-pink-500 p-2">
                            <h3 class="font-bold mb-1 text-lg">${name}</h3>
                            ${year ? `<p class="text-pink-400">💕 ${year}</p>` : ''}
                        </div>`
                    )
                    .addTo(mapInstance)

                popups.current[id] = popup
            })

            // Change cursor to pointer when hovering over points or clusters
            mapInstance.on('mouseenter', ['clusters', 'unclustered-point'], () => {
                mapInstance.getCanvas().style.cursor = 'pointer'
            })
            mapInstance.on('mouseleave', ['clusters', 'unclustered-point'], () => {
                mapInstance.getCanvas().style.cursor = ''
            })

            // Handle clicks on clusters
            mapInstance.on('click', 'clusters', (e) => {
                if (!e.features?.[0]) return
                const features = mapInstance.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                })
                if (!features || features.length === 0) return
                const clusterId = features[0].properties?.cluster_id as number
                const source = mapInstance.getSource('memories')! as mapboxgl.GeoJSONSource
                
                source.getClusterExpansionZoom(
                    clusterId,
                    (error, zoom) => {
                        if (error || !zoom) return

                        mapInstance.easeTo({
                            center: (features[0].geometry as any).coordinates,
                            zoom: zoom
                        })
                    }
                )
            })
        })
    }, [])

    return (
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
    )
}