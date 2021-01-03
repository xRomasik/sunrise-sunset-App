import { useState } from 'react';

import CountryInput from '../../components/country-input/country-input.component';
import SunriseSunset from '../../components/sunrise-sunset/sunrise-sunset.component';
import { getSunriseSunsetTimes } from './homepage.functions';

import './homepage.styles.scss'


const API_KEY = 'a6d738363a19437e9730bea42200f43f';
const API_KEY2 = 'aUrzQwdOTzoBvKMWRmwf';


const HomePage = () => {

    const [countrySearchfield, setCountrySearchfield] = useState('')
    const [dateSearchfield, setDateSearchfield] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [sunsetSunriseTime, setSunsetSunriseTime] = useState({
        sunriseTime: '',
        sunsetTime: ''
    })

    const handleDateInput = (event) => {
        setDateSearchfield(event.target.value)
    }

    const handleCountryInput = (event) => {
        setCountrySearchfield(event.target.value)
    }

    return (
        <div className='homepage'>
            <CountryInput
                handleDateInput={handleDateInput} handleCountryInput={handleCountryInput}
                getSunriseSunsetTimes={() => getSunriseSunsetTimes(countrySearchfield, dateSearchfield, API_KEY, API_KEY2, setSunsetSunriseTime, setErrorMessage)} />
            {
                !errorMessage && sunsetSunriseTime.sunsetTime ?
                    <SunriseSunset sunriseTime={sunsetSunriseTime.sunriseTime} sunsetTime={sunsetSunriseTime.sunsetTime} />
                    : <div className='error-message'>
                        {errorMessage}
                    </div>
            }
        </div>
    )
}

export default HomePage;