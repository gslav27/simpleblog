import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '../../UI/Dialog';
import TextInput from '../../UI/TextInput';
import TextButton from '../../UI/TextButton';
import FormHandlerHOC from '../../../hocs/FormHandlerHOC';


const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  background: #fff;
  padding: 20px;
  width: 90vw;
  max-width: 700px;
`;

const Header = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  flex: 1;
  color: ${({ theme }) => theme.color};
  text-transform: uppercase;
  margin: 10px 0px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin:  5px 0px;
  border: none;
  background: #aaa;
`;


const NewPostForm = ({ inputs, values, onSubmit, onCancel, onChange, formIsFilled }) => (
  <Dialog
    onClose={onCancel}
  >
    <Form onSubmit={onSubmit}>
      <Header>
        <Title id='dialog-title'>New post</Title>
      </Header>
      <Divider />
      {Object.entries(inputs).map(([name, props]) => (
        <TextInput
          key={name}
          value={values[name]}
          id={`newPost${name}`}
          label={name}
          onChange={e => onChange(e, name)}
          aria-label={`new post ${name}`}
          aria-required='true'
          labelAlign='right'
          {...props}
        />
      ))}
      <Divider />
      <Footer>
        <TextButton
          active={formIsFilled()}
          type='submit'
          name='submitNewPost'
        >
          Add Post
        </TextButton>
        <TextButton
          type='button'
          onClick={onCancel}
        >
          Cancel
        </TextButton>
      </Footer>
    </Form>
  </Dialog>
);


NewPostForm.propTypes = {
  inputs: PropTypes.objectOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  formIsFilled: PropTypes.func.isRequired,
};

export default FormHandlerHOC(NewPostForm);
