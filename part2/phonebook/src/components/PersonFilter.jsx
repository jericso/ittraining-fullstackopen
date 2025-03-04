import { useState } from 'react';

const PersonFilter = ({ onChange, nameFilter }) => {
  const handleNameFilterOnChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      filter shown with{' '}
      <input value={nameFilter} onChange={handleNameFilterOnChange} />
    </div>
  );
};

export default PersonFilter;
