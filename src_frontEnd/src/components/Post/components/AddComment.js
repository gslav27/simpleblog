import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
`;

const Label = styled.label`
  ${({ theme }) => theme.boldUppercaseMixin(theme.color)}
`;

const TextArea = styled.textarea`
  ${({ theme }) => theme.inputTextMixin}
`;

const Input = styled.input`
  ${({ theme }) => theme.inputTextMixin}
`;

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


class AddComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      author: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAuthorNameChange = this.handleAuthorNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleAuthorNameChange(e) {
    this.setState({ author: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text, author } = this.state;
    if (text && author) {
      this.props.onChange(text, author);
      this.setState({
        text: '',
        author: '',
      });
      return;
    }
    const alertTemplate = 'is required';
    if (!text) return alert(`"COMMENT TEXT" ${alertTemplate}`);
    if (!author) return alert(`"AUTHOR NAME" ${alertTemplate}`);
  }

  render() {
    const { text, author } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Label htmlFor='newCommentText'>Add comment text:</Label>
          <TextArea
            id='newCommentText'
            name='commentText'
            rows='3'
            cols='100'
            placeholder='your comment...'
            value={text}
            onChange={this.handleTextChange}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor='newCommentAuthor'>Name:</Label>
          <Input
            id='newCommentAuthor'
            type='text'
            value={author}
            onChange={this.handleAuthorNameChange}
            placeholder='your name...'
          />
        </InputGroup>
        <Button
          type='submit'
          name='submitNewComment'
        >
          Add comment
        </Button>
      </form>
    );
  }
}

AddComment.propTypes = { onChange: PropTypes.func.isRequired };

export default AddComment;
