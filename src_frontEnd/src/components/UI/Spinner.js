import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';


const Container = styled.div`
flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
