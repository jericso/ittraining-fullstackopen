import { useState } from 'react';

const PersonForm = ({ onSubmit, persons, heading }) => {
  const [name, setNewName] = useState('');
  const [number, setNewNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPersonObject = { name, number };

    if (persons.some((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
    } else {
      onSubmit(newPersonObject);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h3>{heading}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            value={name}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={number}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
