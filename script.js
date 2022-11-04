//variáveis e seleção de elementos
const apiWeather = '1bf3ab693706ad462427be4a28b9baee'
const countryflagsapi = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search-btn')

//funções

//eventos

searchBtn.addEventListener('click', () => {
  console.log(cityInput.value)
})
