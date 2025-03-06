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
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      })
      .catch((error) => {
        alert(`Getting all persons resulted in error: ${error}`);
        resetState(persons);
      });
  }, []);

  const resetState = (persons) => {
    setPersons(persons);
    setFilteredPersons(persons);
    setNameFilter('');
  };

  const handlePersonFormSubmitCreate = (createPerson) => {
    personService
      .create(createPerson)
      .then((returnedPerson) => {
        const updatedPersons = persons.concat(returnedPerson);
        resetState(updatedPersons);
      })
      .catch((error) => {
        alert(`Adding '${createPerson.name}' resulted in error: ${error}`);
        resetState(persons);
      });
  };

  const handlePersonFormSubmitUpdate = (updatePerson) => {
    personService
      .update(updatePerson.id, updatePerson)
      .then((returnedPerson) => {
        const updatedPersons = persons.map((person) =>
          person.id === updatePerson.id ? returnedPerson : person
        );
        resetState(updatedPersons);
      })
      .catch((error) => {
        alert(`Update to '${updatePerson.name}' resulted in error: ${error}`);
        const updatedPersons = persons.filter(
          (person) => person.id !== updatePerson.id
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
        onSubmitCreate={(createdPerson) =>
          handlePersonFormSubmitCreate(createdPerson)
        }
        onSubmitUpdate={(updatedPerson) =>
          handlePersonFormSubmitUpdate(updatedPerson)
        }
        persons={persons}
        heading={'add a new'}
      />
      <Persons
        persons={filteredPersons}
        heading={'Numbers'}
        onPersonDelete={(deletedPerson) => handlePersonDelete(deletedPerson)}
      />
    </div>
  );
};

export default App;
