import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 3px;
  margin: 1em;
  padding: 0.25em 1em;
  max-width: 240px;
  & :hover {
    cursor: pointer;
  }
  h2 {
    margin: 0;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color};
    border-bottom: 1px solid lightgrey;
    padding: 1em 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgrey;
    padding: 0.5em 0;
    & > span {
      color: grey;
      font-size: 0.9em;
      font-weight: bold;
    }
  }
  & > p {
    line-height: ${({ theme }) => theme.lineHeight};
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


const PostCard = ({ title, description, author, date, onChange }) => (
  <Article onClick={onChange} title='read article'>
    <h2>{title}</h2>
    <p>{description}</p>
    <div>
      <span>{author}</span>
      <span>{date}</span>
    </div>
  </Article>
);


PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default PostCard;
