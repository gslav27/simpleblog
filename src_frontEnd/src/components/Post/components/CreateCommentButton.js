import React from 'react';
import PropTypes from 'prop-types';

import IconButtonAddComment from '_Ui_/IconButtonAddComment';



const CreateCommentButton = ({ onClick }) => (
  <IconButtonAddComment
    id='AddSubCommentButton'
    type='button'
    onClick={onClick}
    title='add comment'
    size='small'
    color='#bbb'
  />
);

CreateCommentButton.propTypes = { onClick: PropTypes.func.isRequired };

export default CreateCommentButton;
