import React from 'react';
import PropTypes from 'prop-types';

import CreateCommentButton from '../components/Post/components/CreateCommentButton';
import NewCommentForm from '../components/Post/components/NewCommentForm';
import RenderForm from '../hocs/RenderForm';

import { newPostCommentInputs as inputs } from '../constants';



const AddNewComment = ({ onSubmit }) => (
  <RenderForm>
    {
      (showForm, OnOpen, onClose) => (
        showForm
          ? (
            <NewCommentForm
              onSubmit={(data) => { onClose(); onSubmit(data); }}
              onCancel={onClose}
              inputs={inputs}
            />
          )
          : <CreateCommentButton onClick={OnOpen} />
      )
    }
  </RenderForm>
);


AddNewComment.propTypes = { onSubmit: PropTypes.func.isRequired };

export default AddNewComment;
