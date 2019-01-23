import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Article = styled.article`
  margin: 3em 0;
  text-align: center;
`;

const Title = styled.h1`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color};
`;

const SubTitle = styled.p`
  color: grey;
  font-size: 0.9em;
  font-weight: bold;
`;

const Divider = styled.hr`
  color: ${({ theme }) => theme.color};
`;

const Text = styled.p`
  line-height: ${({ theme }) => theme.lineHeight};
`;


const PostCard = ({ title, author, date, body }) => (
  <Article>
    <Title>{title}</Title>
    <SubTitle>by {author}</SubTitle>
    <SubTitle>{date}</SubTitle>
    <Divider />
    <Text>{body}</Text>
  </Article>
);


PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};


export default memo(PostCard);
