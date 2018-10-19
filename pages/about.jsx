import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

export const About = () => (
  <Layout>
    <StyledParagraph>
      This page was created by Alexander Kiseliov
    </StyledParagraph>
  </Layout>
);

const StyledParagraph = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default About;
