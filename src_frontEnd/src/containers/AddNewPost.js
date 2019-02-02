import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import { newPostFormInputs as inputs } from '_Utils_/constants';
import getCurrentDate from '_Utils_/getters/getCurrentDate';
import RenderForm from '_Hocs_/RenderForm';
import { postNewPost } from '../store/posts/postsActionCreators';
import CreatePostButton from '../components/Header/components/CreatePostButton';
import NewPostForm from '../components/Header/components/NewPostForm';




const AddNewPost = ({ postNewPost }) => {
  const handleAddPost = ({ title, author, body, description }) => {
    const newPostData = {
      date: getCurrentDate(),
      id: uniqid(),
      title,
      author,
      body,
      description,
    };
    postNewPost(newPostData);
  };

  return (
    <RenderForm>
      {
        (showForm, OnOpen, onClose) => (
          showForm
            ? (
              <NewPostForm
                onSubmit={(data) => { onClose(); handleAddPost(data); }}
                onCancel={onClose}
                inputs={inputs}
              />
            )
            : <CreatePostButton onClick={OnOpen} />
        )
      }
    </RenderForm>
  );
};



AddNewPost.propTypes = { postNewPost: PropTypes.func.isRequired };

const mapDispatchToProps = { postNewPost };

export default connect(null, mapDispatchToProps)(AddNewPost);
