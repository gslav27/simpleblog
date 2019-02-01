import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0;
  border-radius: 3px;
  border: none;
  background-color: rgba(0,0,0,0);
  height: 35px;
  width: 35px;
  // color: ${({ theme }) => theme.colors.inactive};
  color: #777;
  font-size: 27px;
  &:hover {
    cursor: pointer;
  };
`;


const IconButton = ({ children, ...props }) => (
  <StyledButton
    {...props}
  >
    {children}
  </StyledButton>
);


IconButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


export default memo(IconButton);
