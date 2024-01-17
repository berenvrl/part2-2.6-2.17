const CountryDetails = ({ item }) => {
  return (
    <div>
      <h1 style={{ paddingBottom: "10px" }}>{item.name.common}</h1>
      <li>Capital: {item.capital}</li>
      <li>Area {item.area}</li>
      <div style={{ padding: "5px 0" }}>
        <h2>Languages</h2>
        <ul key={item.name.common}>
          {Object.values(item.languages).map((value, i) => {
            return <li key={i}>{value}</li>;
          })}
        </ul>
      </div>
      <img src={item.flags.png} style={{ height: 170, marginTop: "10px" }} />
    </div>
  );
};

export default CountryDetails;
