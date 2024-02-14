import { City, Country } from "country-state-city";

// @Todo - find better module for cities

const formattedCities = City.getAllCities().map((city) => ({
  name: city.name,
  country: city.countryCode,
  location: [city.latitude, city.longitude],
}));

const formattedCountries = Country.getAllCountries().map((country) => ({
  name: country.name,
}));

const useCities = () => {
  const getAllCities = () => formattedCities;
  const getAllCountries = () => formattedCities;
  const getCountryByValue = (value: string) => {
    return formattedCountries.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
  };
  const getCityByValue = (value: string, country?: string) => {
    return formattedCities.filter(
      (item) =>
        item.name.toLowerCase().startsWith(value.toLowerCase()) &&
        item.country.toLowerCase() === country?.toLowerCase()
    );
  };

  return { getAllCities, getAllCountries, getCountryByValue, getCityByValue };
};

export default useCities;
