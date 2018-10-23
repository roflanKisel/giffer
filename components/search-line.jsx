import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class SearchLine extends PureComponent {
  static propTypes = {
    handleSearchByQuery: PropTypes.func.isRequired,
  };

  state = {
    inputText: '',
  };

  handleInputChange = event => {
    this.setState({
      inputText: event.target.value,
    });
  };

  performSearch = event => {
    if (event.key === 'Enter') {
      const { handleSearchByQuery } = this.props;

      handleSearchByQuery({ searchQuery: this.state.inputText });
    }
  };

  render() {
    const { inputText } = this.state;

    return (
      <StyledSearchLine>
        <SearchLineWrapper>
          <h1>Explore</h1>
          <StyledInput
            value={inputText}
            onChange={this.handleInputChange}
            onKeyPress={this.performSearch}
            placeholder="Type something and press enter"
          />
        </SearchLineWrapper>
      </StyledSearchLine>
    );
  }
}

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

const StyledInput = styled.input`
  width: calc(100% - 10px);
  height: 50px;
  font-size: 30px;
  padding-left: 10px;
  margin: 0px;
`;

export default SearchLine;
