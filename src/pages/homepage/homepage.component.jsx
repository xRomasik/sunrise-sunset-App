import { useState, useEffect } from 'react';

import CountryInput from '../../components/country-input/country-input.component';
import SunriseSunset from '../../components/sunrise-sunset/sunrise-sunset.component';

import './homepage.styles.scss'

const HomePage = () => {


    const [country, setCountry] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [date, setDate] = useState('')
    const [coordinates, setCoordinates] = useState(null)
    const [sunInfo, setSunInfo] = useState({
        sunrise: '',
        sunset: ''
    })

    useEffect(() => {
        if (coordinates) {
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
        if (country.length > 2 && country.match(/^[^0-9]*$/)) {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${country.toLowerCase()}&key=a6d738363a19437e9730bea42200f43f`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setCoordinates({
                        latitude: data.results[0].geometry.lat,
                        longitude: data.results[0].geometry.lng,
                        timeOffset: parseInt(data.results[0].annotations.timezone.offset_sec) / 3600
                    });
                }).catch(() => setErrorMessage('Something went wrong, please check the name of the country and try again.'))
        } else if (!country.match(/^[^0-9]*$/)) {
            setErrorMessage('It seems like there is a number in your country name.')
        } else {
            setErrorMessage('Country name must be at least 3 letters long.')
        }
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
                setErrorMessage(null)
            }).catch(() => setErrorMessage('Something went wrong, please check the name of the country and try again.'))

    }

    return (
        <div className='homepage'>
            <CountryInput setDateToSearch={setDateToSearch} setCountryToSearch={setCountryToSearch} fetchCoordinatesForCountry={fetchCoordinatesForCountry} />
            {
                !errorMessage && sunInfo.sunset ?
                    <SunriseSunset sunriseTime={sunInfo.sunrise} sunsetTime={sunInfo.sunset} />
                    : <div className='error-message'>
                        {errorMessage}
                    </div>
            }
        </div>
    )
}

export default HomePage;