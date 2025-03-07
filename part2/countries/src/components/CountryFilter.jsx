const CountryFilter = ({ onChange, countryFilter }) => {
  return (
    <div>
      find countries <input value={countryFilter} onChange={onChange} />
    </div>
  );
};

export default CountryFilter;
