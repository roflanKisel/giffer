import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { searchByQueryRequest } from '../ducks/searchGifs';

export class SearchLine extends PureComponent {
  static propTypes = {
    dispatchSearchByQueryRequest: PropTypes.func,
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
      const { dispatchSearchByQueryRequest } = this.props;

      dispatchSearchByQueryRequest({ searchQuery: this.state.inputText });
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
`;

const SearchLineWrapper = styled.div`
  width: 60%;

  @media (max-device-width: 500px) {
    width: 90%;
    /* overflow: hidden; */
  }
`;

const StyledInput = styled.input`
  width: calc(99% - 10px);
  height: 50px;
  font-size: 30px;
  padding-left: 10px;
  margin: 0px;
`;

const mapDispatchToProps = dispatch => ({
  dispatchSearchByQueryRequest: bindActionCreators(
    searchByQueryRequest,
    dispatch
  ),
});

export default connect(
  null,
  mapDispatchToProps
)(SearchLine);
