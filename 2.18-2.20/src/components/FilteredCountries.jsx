import CountryDetails from "./CountryDetails";
import WeatherDetails from "./WeatherDetails";
import { useState } from "react";

const FilteredCountries = ({
  item,
  filteredCountries,
  fetchdataweather,
  temperatureInfo,
}) => {
  const [show, setShow] = useState(false);

  const handleSelectCountry = () => {
    setShow(true);
  };

  if (filteredCountries.length !== 1 && !show) {
    return (
      <li key={item.name.common} style={{ padding: "4px" }}>
        {item.name.common}{" "}
        <button
          onClick={() => handleSelectCountry()}
          style={{ cursor: "pointer" }}
        >
          show
        </button>
      </li>
    );
  } else if (filteredCountries.length === 1 || show) {
    return (
      <>
        <CountryDetails item={item} />
        <WeatherDetails
          item={item}
          fetchdataweather={fetchdataweather}
          temperatureInfo={temperatureInfo}
        />
      </>
    );
  }
};

export default FilteredCountries;
