import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: inline-block;
`;

const HomeLink = () => (
  <StyledLink to={`${process.env.PUBLIC_URL}/`} title='to home page'> <h3>SimpleBlog</h3></StyledLink>
);

export default memo(HomeLink);
