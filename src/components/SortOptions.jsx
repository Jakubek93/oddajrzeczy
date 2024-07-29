import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';


const SortContainer = styled.div`
  margin-bottom: 1px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
`;

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
