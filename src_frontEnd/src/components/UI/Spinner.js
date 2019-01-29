import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';


const Container = styled.div`
width: 100%;
height: 100%;
margin: auto;
text-align: center;
  & * { 
    color: ${({ theme }) => theme.color}
  }
`;

const Spinner = ({ size, ...props }) => (
  <Container {...props}>
    <CircularProgress size={size} />
  </Container>
);

Spinner.propTypes = { size: PropTypes.number };

Spinner.defaultProps = { size: 50 };

export default Spinner;
