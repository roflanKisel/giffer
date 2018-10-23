import React from 'react';
import styled from 'styled-components';
import withLayout from '../components/layout';

export const About = () => (
  <StyledParagraph>This page was created by Alexander Kiseliov</StyledParagraph>
);

const StyledParagraph = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withLayout(About);
