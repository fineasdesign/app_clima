export type GeocodingResult = {
  name: string
  latitude: number
  longitude: number
  country_code: string
  timezone: string
}

export type GeocodingResponse = {
  results?: GeocodingResult[]
}

export type WeatherCurrent = {
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

export type WeatherCurrentUnits = {
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

export type WeatherResult = {
  current: WeatherCurrent
  current_units: WeatherCurrentUnits
}

export type ForecastResponse = WeatherResult

export type CombinedWeatherData = GeocodingResult & WeatherResult
