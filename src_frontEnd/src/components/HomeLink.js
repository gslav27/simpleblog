import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: inline-block;
`;

const HomeLink = () => (
  <StyledLink to='/' title='to home page'> <h3>SimpleBlog</h3></StyledLink>
);

export default HomeLink;
