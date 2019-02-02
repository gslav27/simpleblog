import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from '_Ui_/TextInput';
import TextButton from '_Ui_/TextButton';
import FormHandlerHOC from '_Hocs_/FormHandlerHOC';




const Form = styled.form`
  width: 100%;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.commentsMain};
`;


const NewCommentForm = ({ inputs, values, onSubmit, onCancel, onChange, formIsFilled }) => (
  <Form onSubmit={onSubmit}>
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
    <TextButton
      active={formIsFilled()}
      type='submit'
    >
      Сomment
    </TextButton>
    <TextButton
      type='button'
      onClick={onCancel}
    >
      Cancel
    </TextButton>
  </Form>
);


NewCommentForm.propTypes = {
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  formIsFilled: PropTypes.func.isRequired,
};

export default FormHandlerHOC(NewCommentForm);
