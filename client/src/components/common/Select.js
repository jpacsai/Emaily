import React from 'react';
import ReactSelect from 'react-select';

import './Select.scss';

const Select = ({ options, defaultValue, onChange, text }) => {
  const defaultOption = options.filter(option => option.value === defaultValue);

  const handleChange = ({value}) => {
    onChange(value);
  }
  return (
    <div className="Select">
      <p>{text || ''}</p>
      <ReactSelect options={options} defaultValue={defaultOption} onChange={(option) => handleChange(option)}/>
    </div>
  );
};

export default Select;
