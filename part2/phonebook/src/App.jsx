import { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonFilter from './components/PersonFilter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setFilteredPersons(initialPersons);
    });
  }, []);

  const handlePersonFormSubmit = (newPerson) => {
    personService.create(newPerson).then((returnedPerson) => {
      const updatedPersons = persons.concat(returnedPerson);

      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);
      setNameFilter('');
    });
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
        heading={'Add a new'}
      />
      <Persons persons={filteredPersons} heading={'Numbers'} />
    </div>
  );
};

export default App;
