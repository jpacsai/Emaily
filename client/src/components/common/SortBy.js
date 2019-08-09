import React from 'react';
import Select from 'react-select';

import './SortBy.scss';

const SortBy = ({ options }) => {
  return (
    <div className="SortBy">
      <p>Sort by: </p>
      <Select options={options} />
    </div>
  );
};

export default SortBy;
