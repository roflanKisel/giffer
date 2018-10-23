import React from 'react';
import styled from 'styled-components';

const withLoadingStatus = Component => ({ isLoading, isFailure, ...props }) => (
  <StyledLoadingStatus>
    {isLoading && !isFailure && <div>Loading...</div>}
    {isFailure && !isLoading && <div>Failured</div>}
    {!isLoading && !isFailure && <Component {...props} />}
  </StyledLoadingStatus>
);

const StyledLoadingStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: inherit;
`;

export default withLoadingStatus;
