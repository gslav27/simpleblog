import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextInput from '../../UI/TextInput';

import { newPostCommentInputs as inputs } from '../../../constants';
import { getObjFromKeys } from '../../../selectors/commonSelectors';


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


class AddCommentForm extends PureComponent {
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
      <form onSubmit={this.handleSubmit}>
        {Object.entries(inputs).map(([name, props]) => (
          <TextInput
            key={name}
            value={this.state[name]}
            id={`newComment${name}`}
            label={name}
            onChange={e => this.handleTextChange(e, name)}
            aria-label={`new comment ${name}`}
            aria-required='true'
            direction='column'
            labelXl
            {...props}
          />
        ))}
        <Button
          active={this.formIsFilled()}
          type='submit'
        >
          Add comment
        </Button>
      </form>
    );
  }
}

AddCommentForm.propTypes = { onSubmit: PropTypes.func.isRequired };

export default AddCommentForm;
