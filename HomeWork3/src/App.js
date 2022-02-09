import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import WeatherResult from './components/WheatherResult';

import axios from "axios";

function App() {
  
  const API_KEY = "a3128a49b60d40fda9f163826220802"
  let cityInput = ""
  const [weatherdata, setWeatherdata] = useState([])

  function cityText(){
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityInput = e.target.value; 
      console.log(cityInput)
    })
    }

   

    // async function getData(value){
    //   if(value === "" && "undefined") alert("please enter a city name!")
    //   const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=7`)
    //   const result = await data.json();
    //   setWeatherdata(result.forecast.forecastday)
    //   console.log(result.forecast.forecastday)
    // }

    async function getData(value){
      if(value === "" && "undefined") alert("please enter a city name!")
      const {data} =  await axios(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=7`)
      .then((res) =>setWeatherdata(res.data.forecast.forecastday) )
      console.log(data)
    }
   



  return (

    <div>
      <h1 className='WeatherApp'>Weather App</h1>
      <div className="search">
        <input className='inputClass' type="text" placeholder="Search a city..." onChange={cityText}  />
        <button onClick={() => getData(cityInput)} >Search</button>
      </div>
     {
     weatherdata.map(item => (<WeatherResult key={item.date} date={item.date} mintemp={item.day.mintemp_c} maxtemp={item.day.maxtemp_c} condition={item.day.condition.text} icon={item.day.condition.icon} sunrise={item.astro.sunrise} sunset={item.astro.sunset} />))
     }
     <Footer />
    </div>
  

  );
}

export default App;
