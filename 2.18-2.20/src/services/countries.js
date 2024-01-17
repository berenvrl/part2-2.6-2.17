import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const result = axios.get(baseUrl);
  return result.then((response) => response.data);
};

export default {
  getAll,
};
