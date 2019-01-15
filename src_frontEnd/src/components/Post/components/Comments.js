import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mainTheme from '../../../utilities/themes';

const Section = styled.section`
  h3 {
    text-transform: lowercase;
    color: ${({ theme }) => theme.color};
    background-color: lightgrey;
    padding: 0.7em 0.2em;
    margin-top: 0;
    margin-bottom: 0.2em;
    border-top: 1px solid ${({ theme }) => theme.color};
  }
  div {
    & > p {
      font-size: 0.9em;
      margin: 0 0 0.8em;
      color: seagreen;
    }
    & > span {
      display: inline-block;
      font-size: 0.7em;
      color: #777;
    }
  }
`;

const Comments = ({ comments }) => (
  <Section theme={mainTheme}>
    <h3>comments</h3>
    {comments.map(comment => (
      <div key={comment.id}>
        <span>{comment.author} left a comment ({comment.date})</span>
        <p>{comment.body}</p>
      </div>
    ))}
  </Section>
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
