export const CAFE_LOCATION_LABEL = 'Aurum, Mumbai'

export const ADDRESS_LINE_1 = '14 Hill Road, Bandra West'
export const ADDRESS_LINE_2 = 'Mumbai, Maharashtra 400050'
export const ADDRESS_FULL = `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}`

export const PHONE = '+91 22 6123 4567'
export const PHONE_PLACEHOLDER = '+91 98765 43210'

const MAP_SEARCH = '14 Hill Road, Bandra West, Mumbai 400050, India'
const MAP_QUERY = encodeURIComponent(MAP_SEARCH)

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`
