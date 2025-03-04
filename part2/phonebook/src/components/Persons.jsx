import Person from './Person';

const Persons = ({ persons, heading }) => (
  <div>
    <h3>{heading}</h3>
    {persons.map((person) => (
      <Person key={person.id} name={person.name} number={person.number} />
    ))}
  </div>
);

export default Persons;
