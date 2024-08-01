import React from "react";
import PropTypes from 'prop-types';
import {
  SearchContainer,
  SearchInput,
} from "./SearchBarStyle.js"

const SearchBar = ({ onSearch }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Wyszukaj przedmioty..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  );
};


SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};
export default SearchBar;
