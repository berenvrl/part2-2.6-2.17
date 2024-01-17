import { useEffect } from "react";

const WeatherDetails = ({ item, fetchdataweather, temperatureInfo }) => {
  const [lattitude, longitude] = item.latlng;

  useEffect(() => {
    fetchdataweather(lattitude, longitude);
  }, []);

  if (
    !temperatureInfo ||
    !temperatureInfo.weather ||
    !temperatureInfo.weather.length === 0
  )
    return null;

  const iconcode = temperatureInfo.weather[0].icon;
  const iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
  return (
    <>
      <h1>Weather in {item.name.common}</h1>
      <p>Temperature {temperatureInfo.main.temp} Celsius</p>
      <img src={iconurl} alt="weather icon" style={{ width: 80 }} />
      <p>Wind {temperatureInfo.wind.speed}m/s</p>
    </>
  );
};

export default WeatherDetails;
