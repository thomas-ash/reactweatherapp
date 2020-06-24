import React, { useState } from 'react';
import { FiChevronUp } from "react-icons/fi";

const apiKey = {
  key: "974e7a726ac8fbea516434f0b2e50676"
};

function App() {
  
  const [weather, setWeather] = useState([]);

  async function fetchData(e) {
      const city = e.target.elements.city.value
       const apiFetch = await fetch(`'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey.key}'`)
        .then(res => res.json())
        .then(data => data)
          setWeather({
            city: apiFetch.name,
            temp: apiFetch.main.temp
          });
  }

  return (
    
   <div className="container">
    
    <main className="app">
      <Search 
      getWeather={fetchData}/>
      <Temp 
      temp={weather.temp}/>
      <Location 
      city={weather.city} />
      <FiChevronUp className="chevron" />
    </main>
    
  </div>
  
  )
}

const Search = (props) => {

   return(

    <form className="search-box" onSubmit={props.getWeather}>
      <input type="search" 
      className="search-bar" 
      placeholder="Search"
      />
    </form>
  )
}

const Temp = ({ temp }) => {

  return(
    
    <div className="temp-box">
      {temp && <h1 className="degrees">{Math.round(temp)}°</h1>}
    </div>

  )
}

function Location({ city }) {

  const dateGenerator = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${date}, ${year}`

  }

  return(

  <div>
    <div className="location-box">
      {city && <h1 className="location">{city}</h1>}
      <div className="date">{dateGenerator(new Date())}</div>
    </div>
  </div>
  )
}

export default App;
