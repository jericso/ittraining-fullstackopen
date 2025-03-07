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

  let displayCountries = '';
  if (filteredCountries) {
    if (filteredCountries.length === 1) {
      displayCountries = <CountryDetail country={filteredCountries[0]} />;
    } else if (filteredCountries.length > 10) {
      displayCountries = <div>Too many matches, specify another filter</div>;
    } else {
      displayCountries = <Countries countries={filteredCountries} />;
    }
  }

  return (
    <div>
      <CountryFilter
        onChange={(event) => handleCountryFilterChange(event.target.value)}
        countryFilter={countryFilter}
      />
      {displayCountries}
    </div>
  );
};

export default App;
