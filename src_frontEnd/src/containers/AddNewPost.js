import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import { postNewPost } from '../store/actions/postsActions';
import { getFormattedDate } from '../selectors/commonSelectors';

import CreatePostButton from '../components/Header/components/CreatePostButton';
import NewPostForm from '../components/Header/components/NewPostForm';
import RenderForm from '../hocs/RenderForm';

import { newPostFormInputs as inputs } from '../utilities/constants';



const AddNewPost = ({ postNewPost }) => {
  const handleAddPost = ({ title, author, body, description }) => {
    const newPostData = {
      date: getFormattedDate(),
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
