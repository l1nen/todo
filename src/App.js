import React, { useState, useEffect } from "react";
import CreateTodo from "./components/CreateTodo"



function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [inputText, setInputText] = useState();
  const [city, setCity] = useState("oslo");


  function fetchWeatherData() {
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("this is our city:", inputText);
    setCity(inputText);
  }

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <>
      <main>


        <h1>WOOP WOOP IM A TITLE YOU SHOULD DELETE WEEE</h1>
        <h3>Search for a city:</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="city name"
            onChange={(e) => setInputText(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>

        {weatherData && (
          <article>
            <h3>Current weather for {city}:</h3>
            <ul>
              <li>Temperature: {weatherData.temperature}</li>
              <li>Description: {weatherData.description}</li>
            </ul>
          </article>
        )}
        <div className="outer-box">
          <CreateTodo />
        </div>
      </main>



    </>
  );
}

export default App;


