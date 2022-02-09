import React from 'react';
import "./Wheather.css"




function WeatherResult( {date, mintemp, maxtemp, icon, condition, sunrise, sunset } ) {


  return (
      <div className="result">
          <h3 className='date'> {date} </h3>

          <ul className='sun'>
              <li className='date'><img  className='sunrise' src="https://i.hizliresim.com/n26bqzg.png" alt="sunrise" width="40px"/> {sunrise}</li>
              {/* <li>Sunset: {sunset}</li> */}
              <li className='sunset'><img  className='sunrise' src="https://i.hizliresim.com/7wxzdqz.png" alt="sunset" width="40px"/> {sunset}</li>
          </ul>
          
          <ul className='info' >
              <li> <img  src={icon} alt="icons" /> </li>
              <li className='Condition'> {condition} </li>
              <li className='Temp'> {mintemp} °C - {maxtemp} °C</li>
          </ul>
      </div>

  )
}

export default WeatherResult;
