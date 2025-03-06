import { useState, useEffect } from 'react';
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

  const resetState = (persons) => {
    setPersons(persons);
    setFilteredPersons(persons);
    setNameFilter('');
  };

  const handlePersonFormSubmitCreate = (newPerson) => {
    personService.create(newPerson).then((returnedPerson) => {
      const updatedPersons = persons.concat(returnedPerson);
      resetState(updatedPersons);
    });
  };

  const handlePersonFormSubmitUpdate = (updatedPerson) => {
    personService
      .update(updatedPerson.id, updatedPerson)
      .then((returnedPerson) => {
        const updatedPersons = persons.map((person) =>
          person.id === updatedPerson.id ? returnedPerson : person
        );
        resetState(updatedPersons);
      })
      .catch((error) => {
        alert(`Update to '${updatedPerson.name}' resulted in error: ${error}`);
        const updatedPersons = persons.filter(
          (person) => person.id !== updatedPerson.id
        );
        resetState(updatedPersons);
      });
  };

  const handlePersonDelete = (deletePerson) => {
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService
        .remove(deletePerson.id)
        .then((response) => {
          const updatedPersons = persons.filter(
            (person) => person.id !== deletePerson.id
          );
          resetState(updatedPersons);
        })
        .catch((error) => {
          console.log(error);
          alert(
            `Deletion of '${deletePerson.name}' resulted in error: ${error}`
          );
          const updatedPersons = persons.filter(
            (person) => person.id !== deletePerson.id
          );
          resetState(updatedPersons);
        });
    }
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
        onSubmitCreate={(newPerson) => handlePersonFormSubmitCreate(newPerson)}
        onSubmitUpdate={(updatedPerson) =>
          handlePersonFormSubmitUpdate(updatedPerson)
        }
        persons={persons}
        heading={'Add a new'}
      />
      <Persons
        persons={filteredPersons}
        heading={'Numbers'}
        onPersonDelete={(deletePerson) => handlePersonDelete(deletePerson)}
      />
    </div>
  );
};

export default App;
