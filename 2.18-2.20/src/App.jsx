import { useEffect, useState } from 'react';
import axios from 'axios';
import countries from './services/countries';
import FilteredCountries from './components/FilteredCountries';
import './index.css';

const api_key = import.meta.env.VITE_KEY;
const api_url = import.meta.env.VITE_URL;

// console.log(api_key);
// console.log(api_url);
// console.log(import.meta);

const App = () => {
  const [input, setInput] = useState('');
  const [queryObjArray, setQueryObjArray] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [temperatureInfo, setTemperatureInfo] = useState({});

  const api = {
    key: api_key,
    base: api_url,
  };

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  //fetching countries data
  const fetchdata = async () => {
    try {
      countries.getAll().then(initialArray => {
        setQueryObjArray(initialArray);
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  //filtered data
  useEffect(() => {
    if (!queryObjArray) return;

    const finalfiltered = queryObjArray.filter(country =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredCountries(finalfiltered);
  }, [queryObjArray, input]);

  //getting weather data
  const fetchdataweather = async (lattitude, longitude) => {
    try {
      const response = await axios.get(
        `${api.base}lat=${lattitude}&lon=${longitude}&appid=${api.key}`
      );
      setTemperatureInfo(response.data);
    } catch (error) {
      console.log('fail getting temperature informations');
      console.error(error.message);
    }
  };

  if (!queryObjArray) return null;

  return (
    <>
      <div style={{ margin: '15px' }}>
        <span>Find countries </span>
        <input
          className="inputfield"
          type="text"
          value={input}
          placeholder="Type to search"
          onChange={handleInputChange}
          style={{ padding: '4px' }}
        />
      </div>
      {input ? (
        filteredCountries.length < 10 ? (
          <div>
            <ul style={{ listStyle: 'none' }}>
              {filteredCountries.map((item, i) => (
                <FilteredCountries
                  item={item}
                  key={i}
                  filteredCountries={filteredCountries}
                  fetchdataweather={fetchdataweather}
                  temperatureInfo={temperatureInfo}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p>Too many matches, specify another filter</p>
          </div>
        )
      ) : null}
    </>
  );
};

export default App;
