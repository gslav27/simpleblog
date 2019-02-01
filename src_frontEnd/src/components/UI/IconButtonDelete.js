import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import IconButton from './IconButton';
import UserInteractionHandlersHOC from '../../hocs/UserInteractionHandlersHOC';


const DeleteButton = ({ type, title, onClick, userOver, handlers, ...restProps }) => (
  <IconButton
    type={type}
    title={title}
    onClick={onClick}
    {...handlers}
    {...restProps}
  >
    {
      userOver
        ? <Delete fontSize='small' nativeColor='gainsboro' />
        : <DeleteOutline fontSize='small' nativeColor='gainsboro' />
    }
  </IconButton>
);


DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  userOver: PropTypes.bool.isRequired,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserInteractionHandlersHOC(DeleteButton);
