import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '../../UI/Dialog';
import TextInput from '../../UI/TextInput';

import { newPostFormInputs as inputs } from '../../../constants';
import { getObjFromKeys } from '../../../selectors/commonSelectors';


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

const Button = styled.button`
  margin: 5px 5px 5px 0px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  // background-color: ${({ active, theme }) => (active ? theme.colors.active : '#eee')};
  // color: ${({ active, theme }) => (active ? '#fff' : theme.colors.inactive)};
  background-color: ${({ active }) => (active ? 'green' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#777')};
  font-size: 1em;
  &:hover {
    cursor: pointer;
  };
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin:  5px 0px;
  border: none;
  background: #aaa;
`;



class NewPostForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = getObjFromKeys(inputs);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formIsFilled = () => !Object.entries(this.state).some(([_, value]) => !value.length);
  }

  handleTextChange(e, type) {
    this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('SUBMIT', this.formIsFilled());
    if (this.formIsFilled()) {
      this.props.onSubmit({ ...this.state });
      this.setState(getObjFromKeys(inputs));
      return;
    }
    const alertTemplate = 'is required';
    const emptyFormField = Object.entries(this.state).find(([_, value]) => !value.length)[0];
    alert(`"${emptyFormField}" ${alertTemplate}`);
  }

  render() {
    return (
      <Dialog
        onClose={this.props.onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Header>
            <Title id='dialog-title'>New post</Title>
          </Header>
          <Divider />
          {Object.entries(inputs).map(([name, props]) => (
            <TextInput
              key={name}
              value={this.state[name]}
              id={`newPost${name}`}
              label={name}
              onChange={e => this.handleTextChange(e, name)}
              aria-label={`new post ${name}`}
              aria-required='true'
              labelAlign='right'
              {...props}
            />
          ))}
          <Divider />
          <Footer>
            <Button
              active={this.formIsFilled()}
              type='submit'
              name='submitNewPost'
            >
              Add Post
            </Button>
            <Button
              type='button'
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
          </Footer>
        </Form>
      </Dialog>
    );
  }
}

NewPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NewPostForm;
