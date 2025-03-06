const Person = ({ name, number, onDelete }) => (
  <div>
    {name} {number} <button onClick={onDelete}>delete</button>
  </div>
);

export default Person;
