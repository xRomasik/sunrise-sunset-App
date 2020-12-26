import sun from '../../assets/sun.png'

import './country-input.styles.scss'


const CountryInput = ({ setDateToSearch, setCountryToSearch, fetchCoordinatesForCountry }) => {

    return (
        <div className='country-input'>
            <div className='input-container'>
                <input className='date-input' type='date' max='9999-12-24' onChange={setDateToSearch} />
                <input className='search-country-bar' type='text' placeholder='Enter country' onChange={setCountryToSearch} />
            </div>
            <button className='show-button' onClick={fetchCoordinatesForCountry}>
                <img className='show-button-image' alt='sun' src={sun} width="50" height="auto" />
                <span className='show-button-text'>SHOW</span>
            </button>
        </div>
    )
}

export default CountryInput;