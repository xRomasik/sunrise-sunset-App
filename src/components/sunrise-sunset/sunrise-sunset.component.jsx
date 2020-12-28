import './sunrise-sunset.styles.scss';

import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';

const SunriseSunset = ({ sunriseTime, sunsetTime }) => {


    return (
        <div className='sunrise-sunset-container'>
            <div className='sunrise-container'>
                <img className='sun-image' alt='sun' src={sun} />
                <span className='sunrise-time-information'> Sunrise is at {sunriseTime} </span>
            </div>
            <div className='sunset-container'>
                <img className='moon-image' alt='moon' src={moon} />
                <span className='sunset-time-information'>Sunset is at {sunsetTime}</span>
            </div>
        </div>
    )
}

export default SunriseSunset;