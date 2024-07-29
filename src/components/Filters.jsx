import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 1px;
  padding-top: 20px;
`;

const Select = styled.select`
  padding: 8px;
  margin-bottom: 10px;
`;

const Filters = ({
  onFilterChange,
  categories = [],
  locations = [],
  voivodeships = [],
}) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleLocationChange = (e) => {
    onFilterChange({ location: e.target.value });
  };

  const handleVoivodeshipChange = (e) => {
    onFilterChange({ voivodeship: e.target.value });
  };

  Filters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    locations: PropTypes.arrayOf(PropTypes.string),
    voivodeships: PropTypes.arrayOf(PropTypes.string),
  };


  return (
    <FilterContainer>
      <Select onChange={handleCategoryChange}>
        <option value="">Wszystkie kategorie</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <Select onChange={handleLocationChange}>
        <option value="">Wszystkie lokalizacje</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </Select>
      <Select onChange={handleVoivodeshipChange}>
        <option value="">Wszystkie województwa</option>
        {voivodeships.map((voivodeship) => (
          <option key={voivodeship} value={voivodeship}>
            {voivodeship}
          </option>
        ))}
      </Select>
    </FilterContainer>
  );
};

export default Filters;
