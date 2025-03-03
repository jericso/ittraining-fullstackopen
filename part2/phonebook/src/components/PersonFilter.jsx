import { useState } from 'react';

const PersonFilter = ({ persons, setFilteredPersons }) => {
  const [nameFilter, setNameFilter] = useState('');

  const handleNameFilterChange = (event) => {
    let filter = event.target.value;

    setNameFilter(filter);

    setFilteredPersons(
      persons.filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
      )
    );
  };

  return (
    <div>
      filter shown with{' '}
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  );
};

export default PersonFilter;
