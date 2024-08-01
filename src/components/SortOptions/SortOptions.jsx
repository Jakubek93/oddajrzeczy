import React from "react";
import PropTypes from 'prop-types';
import {
  SortContainer,
  Select,
} from "./SortOptionsStyle";

const SortOptions = ({ onSortChange }) => {
  return (
    <SortContainer>
      <Select onChange={(e) => onSortChange(e.target.value)}>
        <option value="dateAdded">Sortuj według daty dodania</option>
        <option value="popularity">Sortuj według popularności</option>
      </Select>
    </SortContainer>
  );
};

SortOptions.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default SortOptions;
