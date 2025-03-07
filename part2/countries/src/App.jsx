import { useState, useEffect } from 'react';
import CountryDetail from './components/CountryDetail';
import Countries from './components/Countries';
import CountryFilter from './components/CountryFilter';
import countryService from './services/country';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCountryFilterChange = (countryFilter) => {
    if (countries) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name['common']
            .toUpperCase()
            .includes(countryFilter.toUpperCase())
        )
      );
    }
    setCountryFilter(countryFilter);
  };

  const handleCountryShow = (country) => {
    setFilteredCountries([country]);
    setCountryFilter('');
  };

  let countriesDisplay = '';
  if (filteredCountries) {
    if (filteredCountries.length === 1) {
      countriesDisplay = <CountryDetail country={filteredCountries[0]} />;
    } else if (filteredCountries.length > 10) {
      countriesDisplay = <div>Too many matches, specify another filter</div>;
    } else {
      countriesDisplay = (
        <Countries
          countries={filteredCountries}
          onCountryShow={(country) => handleCountryShow(country)}
        />
      );
    }
  }

  return (
    <div>
      <CountryFilter
        onChange={(event) => handleCountryFilterChange(event.target.value)}
        countryFilter={countryFilter}
      />
      {countriesDisplay}
    </div>
  );
};

export default App;
