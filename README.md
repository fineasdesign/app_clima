# App de Clima

Aplicação web para consultar as condições meteorológicas atuais de qualquer cidade. O projeto utiliza os serviços de geocodificação e previsão do Open-Meteo para buscar a localização e apresentar os dados de clima em uma interface simples, responsiva e acessível.

## Funcionalidades

- Busca de cidades por nome
- Temperatura atual e sensação térmica
- Umidade relativa do ar
- Probabilidade de precipitação
- Velocidade e direção do vento
- Descrição da condição meteorológica
- Identificação visual de período do dia (dia ou noite)
- Estados de carregamento, resultado e cidade não encontrada
- Interface em português do Brasil

## Tecnologias

- TypeScript
- HTML e CSS
- Vite
- Open-Meteo Geocoding API
- Open-Meteo Forecast API

## Como executar

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist`.

### Pré-visualização da build

```bash
npm run preview
```

## Estrutura do projeto

```text
src/
  main.ts                 Interface, estados da tela e interações
  style.css               Estilos da aplicação
  services/openMeteo.ts   Integração com as APIs do Open-Meteo
  types/weather.ts        Tipos das respostas meteorológicas
  utils/weatherCode.ts    Tradução dos códigos climáticos
  utils/windDirection.ts  Conversão de graus para direção do vento
  assets/                 Ícones de sol e lua
```

## API

O projeto não exige cadastro nem chave de API. Os dados são obtidos diretamente das APIs públicas:

- Geocodificação: `https://geocoding-api.open-meteo.com/v1/search`
- Previsão: `https://api.open-meteo.com/v1/forecast`

## Licença

Projeto de estudo desenvolvido como parte do curso Full Stack IA da B7Web.