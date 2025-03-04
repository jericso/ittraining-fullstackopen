import { useState } from 'react';
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm';
import PersonFilter from './components/PersonFilter';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [nameFilter, setNameFilter] = useState('');

  const handlePersonFormSubmit = (newPerson) => {
    const updatedPersons = persons.concat(newPerson);

    setPersons(updatedPersons);
    setFilteredPersons(updatedPersons);
    setNameFilter('');
  };

  const handlePersonFilterChange = (nameFilter) => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toUpperCase().includes(nameFilter.toUpperCase())
      )
    );
    setNameFilter(nameFilter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter
        onChange={(event) => handlePersonFilterChange(event.target.value)}
        nameFilter={nameFilter}
      />
      <PersonForm
        onSubmit={(newPerson) => handlePersonFormSubmit(newPerson)}
        persons={persons}
      />
      <Phonebook persons={filteredPersons} />
    </div>
  );
};

export default App;
