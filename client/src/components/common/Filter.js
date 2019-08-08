import React from 'react';
import Select from 'react-select';

import './Filter.scss';

const Filter = ({ options }) => {
  return (
    <div className="Filter">
      <p>Sort by: </p>
      <Select options={options} />
    </div>
  );
};

export default Filter;
