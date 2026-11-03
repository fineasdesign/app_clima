export type CardinalDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SO' | 'O' | 'NO'

export function getWindDirection(degrees: number): CardinalDirection {
  if (!Number.isFinite(degrees)) {
    return 'N'
  }

  const normalizedDegrees = ((degrees % 360) + 360) % 360

  if (normalizedDegrees < 22.5 || normalizedDegrees >= 337.5) {
    return 'N'
  }
  if (normalizedDegrees < 67.5) {
    return 'NE'
  }
  if (normalizedDegrees < 112.5) {
    return 'E'
  }
  if (normalizedDegrees < 157.5) {
    return 'SE'
  }
  if (normalizedDegrees < 202.5) {
    return 'S'
  }
  if (normalizedDegrees < 247.5) {
    return 'SO'
  }
  if (normalizedDegrees < 292.5) {
    return 'O'
  }
  return 'NO'
}

export const windDirectionToCardinal = getWindDirection
export const degreesToCardinal = getWindDirection
