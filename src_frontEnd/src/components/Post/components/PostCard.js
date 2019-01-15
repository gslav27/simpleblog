import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mainTheme from '../../../utilities/themes';

const Article = styled.article`
  margin: 3em 0;
  text-align: center;
  h1 {
    text-transform: uppercase;
    color: ${({ theme }) => theme.color};
  }
  div {
    & > p {
      color: grey;
      font-size: 0.9em;
      font-weight: bold;
    }
  }
  & > p {
    line-height: ${({ theme }) => theme.lineHeight};
  }
  hr {
    color: ${({ theme }) => theme.color};
  }
`;

const PostCard = ({ title, author, date, body }) => (
  <Article theme={mainTheme}>
    <h1>{title}</h1>
    <div>
      <p>by {author}</p>
      <p>{date}</p>
    </div>
    <hr />
    <p>{body}</p>
  </Article>
);


PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};


export default memo(PostCard);
