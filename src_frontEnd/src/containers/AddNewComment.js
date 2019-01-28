import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CreateCommentButton from '../components/Post/components/CreateCommentButton';
import NewCommentForm from '../components/Post/components/NewCommentForm';

import { newPostCommentInputs as inputs } from '../constants';


class AddNewComment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showAddCommentForm: false };
    this.handleCreateCommentClick = this.handleCreateCommentClick.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCreateCommentClick(e) {
    e.preventDefault();
    this.setState({ showAddCommentForm: true });
  }

  handleNewComment(postData) {
    this.setState({ showAddCommentForm: false });
    this.props.onSubmit(postData);
  }

  handleCancel() {
    this.setState({ showAddCommentForm: false });
  }
 
  render() {
    const { showAddCommentForm } = this.state;
    return (
      showAddCommentForm
        ? <NewCommentForm onSubmit={this.handleNewComment} onCancel={this.handleCancel} inputs={inputs} />
        : <CreateCommentButton onClick={this.handleCreateCommentClick} />
    );
  }
}


AddNewComment.propTypes = { onSubmit: PropTypes.func.isRequired };

export default AddNewComment;
