import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const CommentHeader = styled.span`
  font-size: 0.8em;
  color: #777;
`;

const CommentText = styled.p`
  font-size: 0.9em;
  margin: 0 0 0.8em;
  color: seagreen;
`;


const Comment = ({ author, date, body }) => (
  <Fragment>
    <CommentHeader>{author} left a comment ({date})</CommentHeader>
    <CommentText>{body}</CommentText>
  </Fragment>
);


Comment.propTypes = {
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};


export default memo(Comment);
