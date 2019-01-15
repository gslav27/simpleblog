import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mainTheme from '../../../utilities/themes';

const Form = styled.form`
  div {
    display: flex;
    flex-direction: column;
    margin-top: 0.5em;
  }
  div label, button {
    color: ${({ theme }) => theme.color};  
    text-transform: uppercase;
    font-weight: bold;
  }
  button {
    margin: 0.5em 0;
    padding: 1em;
    border-radius: 3px;
    border: 2px solid ${({ theme }) => theme.color};
    background-color: white;
    &:hover {
      cursor: pointer;
    };
    &:active {
      background: #eee;
    };
  }
  textarea, input {
    font-size: 1em;
  }
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
      <Form onSubmit={this.handleSubmit} theme={mainTheme}>
        <div>
          <label htmlFor='newCommentText'>Add comment text:</label>
          <textarea
            id='newCommentText'
            name='commentText'
            rows='3'
            cols='100'
            placeholder='your comment...'
            value={text}
            onChange={this.handleTextChange}
          />
        </div>
        <div>
          <label htmlFor='newCommentAuthor'>Name:</label>
          <input
            id='newCommentAuthor'
            type='text'
            value={author}
            onChange={this.handleAuthorNameChange}
            placeholder='your name...'
          />
        </div>
        <button
          type='submit'
          name='submitNewComment'
        >
          Add comment
        </button>
      </Form>
    );
  }
}

AddComment.propTypes = { onChange: PropTypes.func.isRequired };

export default AddComment;
