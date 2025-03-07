import Country from './Country';

const Countries = ({ countries, onCountryShow }) => (
  <div>
    {countries.map((country) => (
      <Country
        key={country.cca2}
        countryName={country.name['common']}
        onShow={() => onCountryShow(country)}
      />
    ))}
  </div>
);

export default Countries;
