//variáveis e seleção de elementos
const apiWeather = '1bf3ab693706ad462427be4a28b9baee'
const countryflagsapi = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search-btn')
const city = document.querySelector('#city')
const temperature = document.querySelector('#temperature')
const descriptionWeather = document.querySelector('#description')
const iconImg = document.querySelector('#iconImg')
const flag = document.querySelector('#flag')
const visibility = document.querySelector('#visibility')
const fells = document.querySelector('#fells')
const humidityInfo = document.querySelector('#humidity')
const windInfo = document.querySelector('#wind')
const loadingInfo = document.querySelector('#loading-info')
const locale = document.querySelector('#localInfo')
const tempInfo = document.querySelector('#tempInfo')
const tempInfo2 = document.querySelector('#tempInfo2')
const weather = document.querySelector('#weatherInfo')

//funções
const toggleLoading = () => {
  loadingInfo.classList.toggle('hide')
  locale.classList.toggle('hide')
  tempInfo.classList.toggle('hide')
  tempInfo2.classList.toggle('hide')
  weather.classList.toggle('hide')
}
async function getWeather(city) {
  toggleLoading()
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeather}&units=metric&lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()
  toggleLoading()
  showWeather(data)
}

const showWeather = (data) => {
  const { name, main, weather, sys, wind } = data
  const { temp, feels_like, humidity } = main
  const { description, icon } = weather[0]
  const { country } = sys
  const { speed } = wind

  city.innerHTML = `${name}`
  temperature.innerHTML = `${Math.round(temp)}`
  descriptionWeather.innerHTML = `${description}`
  iconImg.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`)
  flag.setAttribute('src', `${countryflagsapi}${country}`)
  visibility.innerHTML = `${Math.round(temp)}km`
  fells.innerHTML = `${Math.round(feels_like)}°c`
  humidityInfo.innerHTML = `${humidity}%`

  windInfo.innerHTML = `${Math.round(speed)}km/h`
}
//eventos

searchBtn.addEventListener('click', () => {
  let city = cityInput.value
  getWeather(city)
})
//enter key event
cityInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    let city = cityInput.value
    getWeather(city)
  }
})

//get user location
const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiWeather}&units=metric&lang=pt_br`

    fetch(apiWeatherURL)
      .then((res) => res.json())
      .then((data) => showWeather(data))
  })
}
getUserLocation()
