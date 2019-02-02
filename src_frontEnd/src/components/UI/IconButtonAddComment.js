import React from 'react';
import PropTypes from 'prop-types';

import ModeCommentOutlined from '@material-ui/icons/ModeCommentOutlined';
import AddComment from '@material-ui/icons/AddComment';

import UserInteractionHandlersHOC from '_Hocs_/UserInteractionHandlersHOC';
import IconButton from './IconButton';



const IconButtonAddComment = (
  { type, title, onClick, userOver, handlers, size, color, ...restProps },
) => (
  <IconButton
    type={type}
    title={title}
    onClick={onClick}
    {...handlers}
    {...restProps}
  >
    {
      userOver
        ? <AddComment fontSize={size} nativeColor={color} />
        : <ModeCommentOutlined fontSize={size} nativeColor={color} />
    }
  </IconButton>
);


IconButtonAddComment.propTypes = {
  onClick: PropTypes.func.isRequired,
  userOver: PropTypes.bool.isRequired,
  handlers: PropTypes.objectOf(PropTypes.func),
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

IconButtonAddComment.defaultProps = {
  size: 'small',
  color: '#aaa',
  handlers: {},
};

export default UserInteractionHandlersHOC(IconButtonAddComment);
