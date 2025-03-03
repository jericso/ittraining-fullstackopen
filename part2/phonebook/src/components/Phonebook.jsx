import Person from './Person';

const Phonebook = ({ persons }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <Person key={person.id} name={person.name} number={person.number} />
    ))}
  </div>
);

export default Phonebook;
