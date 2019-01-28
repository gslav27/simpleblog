import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../operations/postsOperations';

import CreatePostButton from '../components/Header/components/CreatePostButton';
import NewPostForm from '../components/Header/components/NewPostForm';
import RenderForm from '../hocs/RenderForm';

import { newPostFormInputs as inputs } from '../constants';



const AddNewPost = ({ addPost }) => (
  <RenderForm>
    {
      (showForm, OnOpen, onClose) => (
        showForm
          ? (
            <NewPostForm
              onSubmit={(data) => { onClose(); addPost(data); }}
              onCancel={onClose}
              inputs={inputs}
            />
          )
          : <CreatePostButton onClick={OnOpen} />
      )
    }
  </RenderForm>
);



AddNewPost.propTypes = { addPost: PropTypes.func.isRequired };

const mapDispatchToProps = { addPost };

export default connect(null, mapDispatchToProps)(AddNewPost);
