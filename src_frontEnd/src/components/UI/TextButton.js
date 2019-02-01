import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledButton = styled.button`
  margin: 5px 5px 5px 0px;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  background-color: ${({ active, theme }) => (active ? theme.colors.active : '#eee')};
  color: ${({ active, theme }) => (active ? '#fff' : theme.colors.inactive)};
  font-size: 1em;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px ${({ active, theme }) => (active ? theme.colors.active : '#999')};;
  };
`;


const TextButton = ({ children, ...props }) => (
  <StyledButton
    {...props}
  >
    {children}
  </StyledButton>
);


TextButton.propTypes = { children: PropTypes.string.isRequired };


export default memo(TextButton);
