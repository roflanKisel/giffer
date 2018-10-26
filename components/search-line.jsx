import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

const StyledInput = styled.input`
  width: calc(100% - 10px);
  height: 50px;
  font-size: 30px;
  padding-left: 10px;
  margin: 0px;
`;

const SearchLine = ({ searchQuery, onSearchQueryChange }) => (
  <StyledSearchLine>
    <SearchLineWrapper>
      <h1>Explore</h1>
      <DebounceInput
        element={StyledInput}
        minLength={2}
        debounceTimeout={700}
        value={searchQuery}
        onChange={onSearchQueryChange}
        placeholder="Type something"
      />
    </SearchLineWrapper>
  </StyledSearchLine>
);

const StyledSearchLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  z-index: 0;
`;

const SearchLineWrapper = styled.div`
  width: 90%;
`;

SearchLine.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
};

export default SearchLine;
