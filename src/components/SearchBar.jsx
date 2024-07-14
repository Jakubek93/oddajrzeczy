import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1877f2;
  }
`;

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

export default SearchBar;