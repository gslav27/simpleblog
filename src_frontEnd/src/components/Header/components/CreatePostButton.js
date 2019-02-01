import React from 'react';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import AddCircle from '@material-ui/icons/AddCircle';

import UserInteractionHandlersHOC from '../../../hocs/UserInteractionHandlersHOC';
import IconButton from '../../UI/IconButton';

import theme from '../../../utilities/themes';


const AddPostButton = props => (
  <IconButton
    id='AddPostButton'
    type='button'
    title='create new Post'
    onClick={props.onClick}
    {...props.handlers}
  >
    {
      props.userOver
        ? <AddCircle fontSize='large' nativeColor={theme.colors.icon} />
        : <Add fontSize='large' nativeColor={theme.colors.icon} />
    }
  </IconButton>
);


AddPostButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  userOver: PropTypes.bool.isRequired,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserInteractionHandlersHOC(AddPostButton);
