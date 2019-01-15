import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerDiv = styled.div`
  display: block;
  width: 3em;
  height: 3em;
  border: 3px solid rgba(155,155,155,.3);
  border-radius: 50%;
  border-top-color: #777;
  animation: ${spin} 1s ease-in-out infinite;
`;

const Spinner = () => <SpinnerDiv />;
export default Spinner;
