import Person from './Person';

const Persons = ({ persons, heading, onPersonDelete }) => (
  <div>
    <h3>{heading}</h3>
    {persons.map((person) => (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        onDelete={() => onPersonDelete(person)}
      />
    ))}
  </div>
);

export default Persons;
