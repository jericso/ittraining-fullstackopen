const Country = ({ countryName, onShow }) => (
  <div>
    {countryName} <button onClick={onShow}>Show</button>
  </div>
);

export default Country;
