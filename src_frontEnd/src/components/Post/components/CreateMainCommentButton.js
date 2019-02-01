import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import UserInteractionHandlersHOC from '../../../hocs/UserInteractionHandlersHOC';
import IconButtonAddComment from '../../UI/IconButtonAddComment';

import theme from '../../../utilities/themes';


const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  cursor: pointer;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 17px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-left: 5px;
  color: ${({ mouseOver, theme }) => (mouseOver ? '#777' : theme.colors.inactive)};
  cursor: pointer;
  font-size: 0.8em;
  text-transform: uppercase;
`;


const CreateMainCommentButton = props => (
  <Container
    mouseOver={props.userOver}
    onClick={props.onClick}
    {...props.handlers}
  >
    <IconButtonAddComment
      id='AddCommentButton'
      type='button'
      userOver={props.userOver}
      onClick={props.onClick}
      title='add comment'
      size='large'
      color={theme.colors.icon}
    />
    <Label htmlFor='AddCommentButton' mouseOver={props.userOver}>Add Comment</Label>
  </Container>
);


CreateMainCommentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  userOver: PropTypes.bool.isRequired,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};


export default UserInteractionHandlersHOC(CreateMainCommentButton);
