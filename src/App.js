import { useState, useEffect } from 'react';

import './App.scss';
import sun from './assets/sun.png'
import moon from './assets/moon.png'



function App() {

  const [country, setCountry] = useState('')
  const [date, setDate] = useState('')
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
    timeOffset: ''
  })
  const [sunInfo, setSunInfo] = useState({
    sunrise: '',
    sunset: ''
  })

  useEffect(() => {
    if (coordinates.data) {
      fetchSunriseAndSunsetData()

    }
    console.log('sfsf')
  }, [coordinates])


  const setDateToSearch = (event) => {
    setDate(event.target.value)
  }

  const setCountryToSearch = (event) => {
    setCountry(event.target.value)
  }

  const timeConvertTo24hLocalTimeZoneFormat = (fetchedTime, timeOffset) => {
    const [time, modifier] = fetchedTime.split(' ')
    let [hours, minutes] = time.split(':', 2)
    console.log(time, modifier, hours, minutes)
    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    hours = parseInt(hours) + timeOffset
    console.log(hours)
    if (hours > 24) {
      hours = hours - 24
    }

    return `${hours}:${minutes}`;
  }


  const fetchCoordinatesForCountry = () => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${country.toLowerCase()}&key=a6d738363a19437e9730bea42200f43f`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCoordinates({
          latitude: data.results[0].geometry.lat,
          longitude: data.results[0].geometry.lng,
          timeOffset: parseInt(data.results[0].annotations.timezone.offset_sec) / 3600
        });
      })
  }

  const fetchSunriseAndSunsetData = () => {
    console.log(`fetching:  https://api.sunrise-sunset.org/json?lat=${coordinates.latitude}&lng=${coordinates.longitude}&date=${date}`)
    console.log(country, coordinates.latitude, coordinates.longitude)
    fetch(`https://api.sunrise-sunset.org/json?lat=${coordinates.latitude}&lng=${coordinates.longitude}&date=${date}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSunInfo({
          sunrise: timeConvertTo24hLocalTimeZoneFormat(data.results.sunrise, coordinates.timeOffset),
          sunset: timeConvertTo24hLocalTimeZoneFormat(data.results.sunset, coordinates.timeOffset)
        });
      })

  }

  return (
    <div className='app'>

      <div className='input-container'>
        <input className='date-input' type='date' max='9999-12-24' onChange={setDateToSearch} />
        <input className='search-country-bar' type='text' placeholder='Enter country' onChange={setCountryToSearch} />
      </div>
      <button className='show-button' onClick={fetchCoordinatesForCountry}>
        <img className='show-button-image' alt='sun' src={sun} width="50" height="auto" />
        <span className='show-button-text'>SHOW</span>
      </button>
      {
        (sunInfo.sunset && sunInfo.sunrise) ?
          <div className='sunrise-sunset-container'>
            <div className='sunrise-container'>
              <img className='sun-image' alt='sun' src={sun} />
              <span className='sunrise-time-information'> Sunrise is at {sunInfo.sunrise} </span>
            </div>
            <div className='sunset-container'>
              <img className='moon-image' alt='moon' src={moon} />
              <span className='sunset-time-information'>Sunset is at {sunInfo.sunset}</span>
            </div>
          </div> : null
      }
    </div>
  )

}

export default App;