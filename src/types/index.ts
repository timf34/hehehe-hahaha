export interface MemoryLocation {
    id: string;
    name: string;
    coordinates: [number, number]; // [latitude, longitude]
    year?: string;
    emoji?: string;
}