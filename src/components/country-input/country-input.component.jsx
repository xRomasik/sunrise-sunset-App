import sun from '../../assets/sun.png'

import './country-input.styles.scss'


const CountryInput = ({ handleDateInput, handleCountryInput, getSunriseSunsetTimes }) => {

    return (
        <div className='country-input'>
            <div className='input-container'>
                <input className='date-input' type='date' max='9999-12-24' onChange={handleDateInput} />
                <input className='search-country-bar' type='text' placeholder='Enter country'
                    onChange={handleCountryInput}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            getSunriseSunsetTimes()
                        }
                    }}
                />
            </div>
            <button className='show-button' onClick={getSunriseSunsetTimes}>
                <img className='show-button-image' alt='sun' src={sun} />
                <span className='show-button-text'>SHOW</span>
            </button>
        </div>
    )
}

export default CountryInput;