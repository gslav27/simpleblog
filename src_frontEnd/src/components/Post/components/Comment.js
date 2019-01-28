import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Data = styled.div`
  flex: 1;
`;

const CommentHeader = styled.span`
  font-size: 0.8em;
  color: #777;
`;

const CommentText = styled.p`
  font-size: 0.9em;
  margin: 0 0 0.8em;
  color: seagreen;
`;

const Button = styled.button`
  margin: 5px 0;
  padding: 10px;
  border-radius: 3px;
  background-color: white;
  ${({ theme }) => theme.boldUppercaseMixin(theme.color)}
  border: 1px solid #999;
  color: #999;
  &:hover {
    cursor: pointer;
  };
  &:active {
    background: #eee;
  };
`;


const Comment = ({ author, date, body, onDelete }) => (
  <Container>
    <Data>
      <CommentHeader>{author} left a comment ({date})</CommentHeader>
      <CommentText>{body}</CommentText>
    </Data>
    <Button
      type='button'
      onClick={onDelete}
    >
      delete
    </Button>
  </Container>
);


Comment.propTypes = {
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default memo(Comment);
