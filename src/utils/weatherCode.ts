export function getWeatherDescription(weatherCode: number): string {
  switch (weatherCode) {
    case 0:
      return 'Céu limpo'
    case 1:
      return 'Predominantemente limpo'
    case 2:
      return 'Parcialmente nublado'
    case 3:
      return 'Nublado'
    case 45:
      return 'Neblina'
    case 48:
      return 'Neblina com geada'
    case 51:
      return 'Garoa leve'
    case 53:
      return 'Garoa moderada'
    case 55:
      return 'Garoa intensa'
    case 56:
      return 'Garoa congelante leve'
    case 57:
      return 'Garoa congelante intensa'
    case 61:
      return 'Chuva leve'
    case 63:
      return 'Chuva moderada'
    case 65:
      return 'Chuva forte'
    case 66:
      return 'Chuva congelante leve'
    case 67:
      return 'Chuva congelante forte'
    case 71:
      return 'Neve leve'
    case 73:
      return 'Neve moderada'
    case 75:
      return 'Neve forte'
    case 77:
      return 'Grãos de neve'
    case 80:
      return 'Pancadas de chuva leves'
    case 81:
      return 'Pancadas de chuva moderadas'
    case 82:
      return 'Pancadas de chuva violentas'
    case 85:
      return 'Pancadas de neve leves'
    case 86:
      return 'Pancadas de neve fortes'
    case 95:
      return 'Tempestade leve ou moderada'
    case 96:
      return 'Tempestade com granizo leve'
    case 99:
      return 'Tempestade com granizo forte'
    default:
      return 'Condição desconhecida'
  }
}

export const weatherCodeToDescription = getWeatherDescription
