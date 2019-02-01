import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Comment from './Comment';
import Spinner from '../../UI/Spinner';


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


const CommentsList = ({ comments, onDeleteComment }) => (
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
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      body: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
  commentsLoading: PropTypes.bool.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};


export default memo(CommentsSection);
