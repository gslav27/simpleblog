import React from 'react';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import AddCircle from '@material-ui/icons/AddCircle';

import UserInteractionHandlersHOC from '../../../hocs/UserInteractionHandlersHOC';
import Button from '../../UI/Button';


const AddPostButton = props => (
  <Button
    id='AddPostButton'
    type='button'
    title='create new Post'
    onClick={props.onClick}
    {...props.handlers}
  >
    {
      props.userOver
        ? <AddCircle fontSize='large' nativeColor='gold' />
        : <Add fontSize='large' nativeColor='gold' />
    }
  </Button>
);


AddPostButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  userOver: PropTypes.bool.isRequired,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserInteractionHandlersHOC(AddPostButton);
