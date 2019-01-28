import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import CreatePostButton from '../components/Header/components/CreatePostButton';
import NewPostForm from '../components/Header/components/NewPostForm';

import { newPostFormInputs as inputs } from '../constants';


class AddNewPost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showAddPostForm: false };
    this.handleCreatePostClick = this.handleCreatePostClick.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCreatePostClick(e) {
    e.preventDefault();
    this.setState({ showAddPostForm: true });
  }

  handleNewPost(postData) {
    this.setState({ showAddPostForm: false });
    this.props.onSubmit({ ...postData, id: uniqid() });
  }

  handleCancel() {
    this.setState({ showAddPostForm: false });
  }
 
  render() {
    const { showAddPostForm } = this.state;
    return (
      showAddPostForm
        ? <NewPostForm onSubmit={this.handleNewPost} onCancel={this.handleCancel} inputs={inputs} />
        : <CreatePostButton onClick={this.handleCreatePostClick} />
    );
  }
}


AddNewPost.propTypes = { onSubmit: PropTypes.func.isRequired };

export default AddNewPost;
