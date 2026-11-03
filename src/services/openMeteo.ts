import type {
  CombinedWeatherData,
  ForecastResponse,
  GeocodingResponse,
  GeocodingResult,
  WeatherResult,
} from '../types/weather'

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast'

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

export async function searchCity(cityName: string): Promise<GeocodingResult | null> {
  if (typeof cityName !== 'string' || cityName.trim() === '') {
    return null
  }

  const params = new URLSearchParams({
    name: cityName.trim(),
    count: '1',
    language: 'pt',
    format: 'json',
  })

  try {
    const response = await fetch(`${GEOCODING_API_URL}?${params.toString()}`)
    if (!response.ok) {
      return null
    }

    const data = await response.json() as GeocodingResponse
    const result = data.results?.[0]

    if (
      !result ||
      typeof result.name !== 'string' ||
      typeof result.latitude !== 'number' ||
      !Number.isFinite(result.latitude) ||
      result.latitude < -90 ||
      result.latitude > 90 ||
      typeof result.longitude !== 'number' ||
      !Number.isFinite(result.longitude) ||
      result.longitude < -180 ||
      result.longitude > 180 ||
      typeof result.country_code !== 'string' ||
      result.country_code.trim() === '' ||
      typeof result.timezone !== 'string' ||
      result.timezone.trim() === ''
    ) {
      return null
    }

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country_code: result.country_code,
      timezone: result.timezone,
    }
  } catch {
    return null
  }
}

export async function getWeather(
  latitude: number,
  longitude: number,
  timezone: string,
): Promise<WeatherResult | null> {
  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180 ||
    typeof timezone !== 'string' ||
    timezone.trim() === ''
  ) {
    return null
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      'precipitation_probability',
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'wind_speed_10m',
      'wind_direction_10m',
      'precipitation',
      'weather_code',
    ].join(','),
    timezone: timezone.trim(),
  })

  try {
    const response = await fetch(`${FORECAST_API_URL}?${params.toString()}`)
    if (!response.ok) {
      return null
    }

    const data = await response.json() as ForecastResponse
    const current = data.current
    const units = data.current_units

    if (
      !current ||
      !isFiniteNumber(current.temperature_2m) ||
      !isFiniteNumber(current.relative_humidity_2m) ||
      !isFiniteNumber(current.apparent_temperature) ||
      (current.is_day !== 0 && current.is_day !== 1) ||
      !isFiniteNumber(current.precipitation_probability) ||
      !isFiniteNumber(current.precipitation) ||
      !isFiniteNumber(current.weather_code) ||
      !isFiniteNumber(current.wind_speed_10m) ||
      !isFiniteNumber(current.wind_direction_10m) ||
      !units ||
      typeof units.temperature_2m !== 'string' ||
      typeof units.relative_humidity_2m !== 'string' ||
      typeof units.apparent_temperature !== 'string' ||
      typeof units.is_day !== 'string' ||
      typeof units.precipitation_probability !== 'string' ||
      typeof units.precipitation !== 'string' ||
      typeof units.weather_code !== 'string' ||
      typeof units.wind_speed_10m !== 'string' ||
      typeof units.wind_direction_10m !== 'string'
    ) {
      return null
    }

    return { current, current_units: units }
  } catch {
    return null
  }
}

export async function searchWeather(
  cityName: string,
): Promise<CombinedWeatherData | null> {
  const city = await searchCity(cityName)
  if (!city) {
    return null
  }

  const weather = await getWeather(
    city.latitude,
    city.longitude,
    city.timezone,
  )
  if (!weather) {
    return null
  }

  return {
    ...city,
    ...weather,
  }
}
