import Country from './Country';

const Countries = ({ countries }) => (
  <div>
    {countries.map((country) => (
      <Country key={country.cca2} countryName={country.name['common']} />
    ))}
  </div>
);

export default Countries;
