import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const CountryDetail = ({ country }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getCurrent(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then((currentWeather) => {
        setCurrentWeather(currentWeather);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let weatherDisplay = '';
  if (currentWeather) {
    weatherDisplay = (
      <div>
        <div>Temperature {currentWeather['temp']} Celsius</div>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0]['icon']}@2x.png`}
          />
        </div>
        <div>Wind {currentWeather['wind_speed']} m/s</div>
      </div>
    );
  }

  return (
    <div>
      <h1>{country.name['common']}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags['png']} />
      <h2>Weather in {country.capital[0]}</h2>
      {weatherDisplay}
    </div>
  );
};

export default CountryDetail;
