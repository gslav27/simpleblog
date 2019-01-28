import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import UserInteractionHandlersHOC from '../../../hocs/UserInteractionHandlersHOC';
import Button from '../../UI/Button';


const DeltePostButton = props => (
  <Button
    type='button'
    title='delete Post'
    onClick={props.onClick}
    {...props.handlers}
  >
    {
      props.userOver
        ? <Delete fontSize='small' nativeColor='grey' />
        : <DeleteOutline fontSize='small' nativeColor='gainsboro' />
    }
  </Button>
);


DeltePostButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  userOver: PropTypes.bool.isRequired,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserInteractionHandlersHOC(DeltePostButton);
