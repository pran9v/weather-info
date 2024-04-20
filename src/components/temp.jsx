import React, { useState, useEffect } from 'react'
import './style.css'
import sunny from '../icons/wi-day-sunny.svg'
import cloudy from '../icons/wi-cloudy.svg'
import fog from '../icons/wi-fog.svg'
import dust from '../icons/wi-dust.svg'
import wind from '../icons/wi-windy.svg'
import smoke from '../icons/wi-smoke.svg'
import pressure from '../icons/pressure-icon.svg'
import humidity from '../icons/wi-humidity.svg'

const Temp = () => {
  const [search, setSearch] = useState("Bijnor")
  const [weatherData, setWeatherData] = useState(null)
  const [icon, setIcon] = useState("")
  const iconMap = {
    'Clear': sunny,
    'Clouds': cloudy, 
    'Fog': fog,
    'Haze': dust,
    'Smoke': smoke
  }
  
  const getWeatherInfo = async () => {
    try {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=80c11e98e7ba4ce29c5181a9833267dc`)
      if(!response.ok) {
        throw new Error('Response was not ok')
      }
      let data = await response.json()
      const img = data.weather[0].main;
      console.log(img)
      setWeatherData(data)
      setIcon(img)
    } catch (error) {
      console.log('Fetch error: ', error)
    }
  }
  useEffect(() => {
    getWeatherInfo()
  }) 

  return (
    <>
      <div className="wrap">
        <div className="search-body">
          <input type="text" className="search"
            placeholder='city name...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {weatherData && (<div className="main-body">
          <div className="weather-icon">
            <img src={iconMap[icon] || sunny} alt=""/>
          </div>
          <div className="about">
            <div className="temp">{weatherData.main.temp}&deg;C</div>
            <div className="weather-condition">{weatherData.weather[0].main}</div>
            {console.log(weatherData.weather[0].main)}
            <div className="date">{new Date().toLocaleString()}</div>
            <div className="more-about">
              <div className="humidity-div">
                <div className="hum"><img src={humidity} className='humidimg' alt="Humidity: "/></div>
                <div className="humidity">{weatherData.main.humidity}%</div>
              </div>
              <div className="pressure-div">
                <div className="press"><img src={pressure} className='pressureimg' alt="Pressure: "/></div>
                <div className="pressure">{weatherData.main.pressure}mb</div>
              </div>
              <div className="wind-div">
                <div className="win"><img src={wind} className='windimg' alt="Wind speed: "/></div>
                <div className="wind">{weatherData.wind.speed}m/s</div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

    </>
  )
}

export default Temp