const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name['common']}</h1>
    <div>Capital {country.capital}</div>
    <div>Area {country.area}</div>
    <h3>Languages</h3>
    <ul>
      <li>{'TODO: [language list]'}</li>
    </ul>
    <img src={country.flags['png']} />
  </div>
);

export default CountryDetail;
