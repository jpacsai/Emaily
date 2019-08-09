import React from 'react';
import Select from 'react-select';

import './SortBy.scss';

const SortBy = ({ options, defaultValue, onChange }) => {
  const defaultOption = options.filter(option => option.value === defaultValue);

  const handleChange = ({value}) => {
    onChange(value);
  }
  return (
    <div className="SortBy">
      <p>Sort by: </p>
      <Select options={options} defaultValue={defaultOption} onChange={(option) => handleChange(option)}/>
    </div>
  );
};

export default SortBy;
