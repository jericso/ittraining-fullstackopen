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

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter persons={persons} setFilteredPersons={setFilteredPersons} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <Phonebook persons={filteredPersons} />
    </div>
  );
};

export default App;
