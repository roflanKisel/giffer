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
      <SearchLineHeader>Explore</SearchLineHeader>
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

const SearchLineHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
`;

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
