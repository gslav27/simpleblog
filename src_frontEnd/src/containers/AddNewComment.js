import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { newPostCommentInputs as inputs } from '_Utils_/constants/constants';
import RenderForm from '_Hocs_/RenderForm';
import CreateMainCommentButton from '../components/Post/components/CreateMainCommentButton';
import CreateCommentButton from '../components/Post/components/CreateCommentButton';
import NewCommentForm from '../components/Post/components/NewCommentForm';



const getOpenFormButton = ({ commentType, onClick }) => ((commentType === 'main')
  ? <CreateMainCommentButton onClick={onClick} />
  : <CreateCommentButton onClick={onClick} />
);


const AddNewComment = ({ onSubmit, commentType }) => (
  <RenderForm>
    {
    (showForm, onOpen, onClose) => (
      showForm
        ? (
          <NewCommentForm
            onSubmit={(data) => { onClose(); onSubmit(data); }}
            onCancel={onClose}
            inputs={inputs}
          />
        )
        // : <CreateMainCommentButton onClick={OnOpen} />
        : getOpenFormButton({ onClick: onOpen, commentType })
    )
  }
  </RenderForm>
);


AddNewComment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  commentType: PropTypes.string.isRequired,
};

export default memo(AddNewComment);
