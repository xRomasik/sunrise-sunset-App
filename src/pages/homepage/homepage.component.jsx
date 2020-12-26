import { useState, useEffect } from 'react';

import CountryInput from '../../components/country-input/country-input.component';
import SunriseSunset from '../../components/sunrise-sunset/sunrise-sunset.component';

const HomePage = () => {


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
        <div>
            <CountryInput setDateToSearch={setDateToSearch} setCountryToSearch={setCountryToSearch} fetchCoordinatesForCountry={fetchCoordinatesForCountry} />
            {
                sunInfo.sunset && sunInfo.sunrise ?
                    <SunriseSunset sunriseTime={sunInfo.sunrise} sunsetTime={sunInfo.sunset} />
                    : null
            }
        </div>
    )
}

export default HomePage;