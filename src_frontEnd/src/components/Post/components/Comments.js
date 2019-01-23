import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Header = styled.h3`
  text-transform: lowercase;
  color: ${({ theme }) => theme.color};
  background-color: lightgrey;
  padding: 0.7em 0.2em;
  margin-top: 0;
  margin-bottom: 0.2em;
  border-top: 1px solid ${({ theme }) => theme.color};
`;

const CommentDetails = styled.span`
  font-size: 0.8em;
  color: #777;
`;

const CommentText = styled.p`
  font-size: 0.9em;
  margin: 0 0 0.8em;
  color: seagreen;
`;

const Comments = ({ comments }) => (
  <Fragment>
    <Header>comments</Header>
    {comments.map(comment => (
      <div key={comment.id}>
        <CommentDetails>{comment.author} left a comment ({comment.date})</CommentDetails>
        <CommentText>{comment.body}</CommentText>
      </div>
    ))}
  </Fragment>
);


Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      body: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
};


export default Comments;
