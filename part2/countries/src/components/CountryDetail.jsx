const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name['common']}</h1>
    <div>Capital {country.capital[0]}</div>
    <div>Area {country.area}</div>
    <h3>Languages</h3>
    <ul>
      {Object.entries(country.languages).map((language) => (
        <li key={language[0]}>{language[1]}</li>
      ))}
    </ul>
    <img src={country.flags['png']} />
  </div>
);

export default CountryDetail;
