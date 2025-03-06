import { useState } from 'react';

const PersonForm = ({ onSubmitCreate, onSubmitUpdate, persons, heading }) => {
  const [name, setNewName] = useState('');
  const [number, setNewNumber] = useState('');

  const resetState = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      persons.some((person) => person.name.toUpperCase() === name.toUpperCase())
    ) {
      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(
          (person) => person.name.toUpperCase() === name.toUpperCase()
        );
        onSubmitUpdate({ ...person, number: number });
        resetState();
      }
    } else {
      onSubmitCreate({ name, number });
      resetState();
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
