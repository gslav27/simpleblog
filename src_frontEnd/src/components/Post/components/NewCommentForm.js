import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from '../../UI/TextInput';
import FormHandlerHOC from '../../../hocs/FormHandlerHOC';


const Button = styled.button`
  margin: 0.5em 0;
  padding: 1em;
  border-radius: 3px;
  border: 2px solid ${({ theme }) => theme.color};
  background-color: white;
  ${({ theme }) => theme.boldUppercaseMixin(theme.color)}
  &:hover {
    cursor: pointer;
  };
  &:active {
    background: #eee;
  };
`;


const NewCommentForm = ({ inputs, values, onSubmit, onChange, formIsFilled }) => (
  <form onSubmit={onSubmit}>
    {Object.entries(inputs).map(([name, props]) => (
      <TextInput
        key={name}
        value={values[name]}
        id={`newComment${name}`}
        label={name}
        onChange={e => onChange(e, name)}
        aria-label={`new comment ${name}`}
        aria-required='true'
        direction='column'
        labelXl
        {...props}
      />
    ))}
    <Button
      active={formIsFilled()}
      type='submit'
    >
      Add comment
    </Button>
  </form>
);


NewCommentForm.propTypes = {
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  formIsFilled: PropTypes.func.isRequired,
};

export default FormHandlerHOC(NewCommentForm);
