export interface GeocodingResult {
  name: string
  latitude: number
  longitude: number
  country_code: string
  timezone: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

export interface WeatherCurrent {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: 0 | 1
  precipitation_probability: number
  precipitation: number
  weather_code: number
  wind_speed_10m: number
  wind_direction_10m: number
}

export interface WeatherCurrentUnits {
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  is_day: string
  precipitation_probability: string
  precipitation: string
  weather_code: string
  wind_speed_10m: string
  wind_direction_10m: string
}

export interface WeatherResult {
  current: WeatherCurrent
  current_units: WeatherCurrentUnits
}

export type ForecastResponse = WeatherResult

export interface CombinedWeatherData extends GeocodingResult, WeatherResult {}
