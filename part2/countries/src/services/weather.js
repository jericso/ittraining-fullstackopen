import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall';
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_APIKEY;
const units = '&units=metric';

const getCurrent = (latitude, longitude) => {
  let url = baseUrl;
  url += `?lat=${latitude}&lon=${longitude}`;
  url += `&appid=${apiKey}`;
  url += units;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default { getCurrent };
