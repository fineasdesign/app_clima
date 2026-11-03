import './style.css'
import { searchWeather } from './services/openMeteo'
import { getWeatherDescription } from './utils/weatherCode'
import { getWindDirection } from './utils/windDirection'
import sunIconUrl from './assets/sun.svg'
import moonIconUrl from './assets/moon.svg'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Elemento raiz da aplicação não encontrado.')
}

app.innerHTML = `
  <main class="app-shell">
    <form class="search-area" id="search-form" role="search">
      <label class="sr-only" for="city-input">Nome da cidade</label>
      <input
        class="search-input"
        id="city-input"
        name="city"
        type="search"
        placeholder="Digite o nome da cidade"
        autocomplete="off"
      />
      <button class="search-button" id="search-button" type="submit">
        Buscar
      </button>
    </form>

    <article class="weather-card" aria-live="polite">
      <div class="empty-state" id="empty-state">
        <p>Pesquise uma cidade para ver o clima</p>
      </div>

      <div class="loading-state" id="loading-state" hidden>
        <span class="spinner" aria-hidden="true"></span>
        <p>Carregando clima...</p>
      </div>

      <div class="weather-content" id="weather-result" hidden>
        <aside class="weather-sidebar" id="weather-sidebar" aria-label="Dados principais do clima">
          <div class="weather-temperature" id="weather-temperature"></div>
          <div class="weather-location" id="weather-location"></div>
          <time class="weather-date" id="weather-date"></time>
          <div class="weather-day-night">
            <img class="weather-day-night-icon" id="weather-day-night-icon" alt="" />
            <span id="weather-day-night"></span>
          </div>
          <div class="weather-condition" id="weather-condition"></div>
        </aside>

        <section class="weather-details" id="weather-details" aria-label="Dados meteorológicos detalhados">
          <div class="metric-item" id="metric-humidity">
            <span class="metric-label">Umidade</span>
            <strong class="metric-value" id="humidity-value"></strong>
          </div>
          <div class="metric-item" id="metric-apparent-temperature">
            <span class="metric-label">Sensação térmica</span>
            <strong class="metric-value" id="apparent-temperature-value"></strong>
          </div>
          <div class="metric-item" id="metric-precipitation">
            <span class="metric-label">Precipitação</span>
            <strong class="metric-value" id="precipitation-value"></strong>
          </div>
          <div class="metric-item" id="metric-wind">
            <span class="metric-label">Vento</span>
            <strong class="metric-value" id="wind-value"></strong>
          </div>
        </section>
      </div>
    </article>
  </main>
`

const searchForm = app.querySelector<HTMLFormElement>('#search-form')
const cityInput = app.querySelector<HTMLInputElement>('#city-input')
const searchButton = app.querySelector<HTMLButtonElement>('#search-button')
const weatherCard = app.querySelector<HTMLElement>('.weather-card')
const emptyState = app.querySelector<HTMLElement>('#empty-state')
const loadingState = app.querySelector<HTMLElement>('#loading-state')
const weatherResult = app.querySelector<HTMLElement>('#weather-result')

if (
  !searchForm ||
  !cityInput ||
  !searchButton ||
  !weatherCard ||
  !emptyState ||
  !loadingState ||
  !weatherResult
) {
  throw new Error('Elementos da interface não encontrados.')
}

type WeatherUiState = 'empty' | 'loading' | 'result'

const resultContainers = weatherResult.querySelectorAll<HTMLElement>(
  '#weather-temperature, #weather-location, #weather-date, #weather-day-night, #weather-condition, .metric-value',
)

const formatLongDate = (timezone: string): string => {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: timezone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
  } catch {
    return ''
  }
}

const clearResult = () => {
  resultContainers.forEach((container) => {
    container.textContent = ''
  })
}

const setUiState = (state: WeatherUiState) => {
  const isEmpty = state === 'empty'
  const isLoading = state === 'loading'
  const isResult = state === 'result'

  emptyState.hidden = !isEmpty
  loadingState.hidden = !isLoading
  weatherResult.hidden = !isResult
  cityInput.disabled = isLoading
  searchButton.disabled = isLoading
  weatherCard.setAttribute('aria-busy', String(isLoading))

  if (isEmpty || isLoading) {
    clearResult()
  }
}

setUiState('empty')

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const cityName = cityInput.value.trim()
  if (!cityName) {
    return
  }

  setUiState('loading')

  const result = await searchWeather(cityName)

  if (!result) {
    setUiState('empty')
    return
  }

  const temperature = app.querySelector<HTMLElement>('#weather-temperature')
  const location = app.querySelector<HTMLElement>('#weather-location')
  const date = app.querySelector<HTMLElement>('#weather-date')
  const dayNight = app.querySelector<HTMLElement>('#weather-day-night')
  const dayNightIcon =
    app.querySelector<HTMLImageElement>('#weather-day-night-icon')
  const condition = app.querySelector<HTMLElement>('#weather-condition')

  if (!temperature || !location || !date || !dayNight || !dayNightIcon || !condition) {
    setUiState('empty')
    return
  }

  temperature.textContent =
    `${result.current.temperature_2m.toFixed(1)}${result.current_units.temperature_2m}`
  location.textContent = `${result.name}, ${result.country_code}`
  date.textContent = formatLongDate(result.timezone)
  dayNight.textContent = result.current.is_day === 1 ? 'Dia' : 'Noite'
  dayNightIcon.src =
    result.current.is_day === 1 ? sunIconUrl : moonIconUrl
  dayNightIcon.alt =
    result.current.is_day === 1 ? 'Ícone de sol' : 'Ícone de lua'
  condition.textContent = getWeatherDescription(result.current.weather_code)

  const humidity = app.querySelector<HTMLElement>('#humidity-value')
  const apparentTemperature =
    app.querySelector<HTMLElement>('#apparent-temperature-value')
  const precipitation = app.querySelector<HTMLElement>('#precipitation-value')
  const wind = app.querySelector<HTMLElement>('#wind-value')

  if (!humidity || !apparentTemperature || !precipitation || !wind) {
    setUiState('empty')
    return
  }

  humidity.textContent =
    `${result.current.relative_humidity_2m}${result.current_units.relative_humidity_2m}`
  apparentTemperature.textContent =
    `${result.current.apparent_temperature.toFixed(1)}${result.current_units.apparent_temperature}`
  precipitation.textContent =
    `${result.current.precipitation_probability}${result.current_units.precipitation_probability}`

  const windDegrees = Math.round(result.current.wind_direction_10m)
  const cardinalDirection = getWindDirection(result.current.wind_direction_10m)
  wind.textContent =
    `${result.current.wind_speed_10m.toFixed(1)} ${result.current_units.wind_speed_10m} · ` +
    `${windDegrees}° (${cardinalDirection})`

  setUiState('result')
})
