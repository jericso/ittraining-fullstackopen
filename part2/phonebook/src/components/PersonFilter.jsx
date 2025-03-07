const PersonFilter = ({ onChange, nameFilter }) => {
  return (
    <div>
      filter shown with <input value={nameFilter} onChange={onChange} />
    </div>
  );
};

export default PersonFilter;
