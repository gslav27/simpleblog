import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { currentPostCommentsPropType } from '_Utils_/types/types';
import Spinner from '_Ui_/Spinner';
import Comment from './Comment';


const Header = styled.h3`
  text-transform: capitalize;
  color: ${({ theme }) => theme.color};
  padding: 10px 0px 5px;
  margin: 0;
  font-size: 0.9em;
`;

const Qty = styled.i`
  color: ${({ theme }) => theme.color};
  &:before {
    content: ' (';
    position: relative;
    left: 0;
  };
  &:after {
    content: ')';
    position: relative;
    right: 0;
  };
`;

const Text = styled.p`
  color: #999;
  font-weight: 900;
  text-align: center;
`;


export const CommentsList = ({ comments, onDeleteComment }) => (
  comments.length
    ? (
      comments.map(props => (
        <Comment
          key={props._id}
          onDelete={onDeleteComment}
          {...props}
        />
      ))
    )
    : <Text>There are no comments yet.</Text>
);


const CommentsSection = ({ comments, commentsLoading, onDeleteComment }) => (
  <>
    <Header>
      comments
      <Qty>{comments.length}</Qty>
    </Header>
    {
      commentsLoading
        ? <Spinner />
        : CommentsList({ comments, onDeleteComment })
    }
  </>
);


CommentsSection.propTypes = {
  comments:         currentPostCommentsPropType.isRequired,
  commentsLoading:  PropTypes.bool.isRequired,
  onDeleteComment:  PropTypes.func.isRequired,
};


export default memo(CommentsSection);
