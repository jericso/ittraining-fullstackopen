import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PersonFilter from './components/PersonFilter';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const confirmationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`Getting all persons resulted in error: ${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
        setConfirmationMessage(`Added ${createPerson.name}`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
        resetState(updatedPersons);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorMessage(
          `Adding '${createPerson.name}' resulted in error: ${error.response.data.error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
        setConfirmationMessage(`Updated ${updatePerson.name}`);
        setTimeout(() => {
          setConfirmationMessage(null);
        }, 5000);
        resetState(updatedPersons);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorMessage(
          `Update to '${updatePerson.name}' resulted in error: ${error.response.data.error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
          setConfirmationMessage(`Deleted ${deletePerson.name}`);
          setTimeout(() => {
            setConfirmationMessage(null);
          }, 5000);
          resetState(updatedPersons);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(
            `Deletion of '${deletePerson.name}' resulted in error: ${error}`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      <Notification message={confirmationMessage} style={confirmationStyle} />
      <Notification message={errorMessage} style={errorStyle} />
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
