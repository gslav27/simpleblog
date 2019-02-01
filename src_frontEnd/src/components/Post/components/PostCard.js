import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Article = styled.article`
  margin: 50px 0px 20px;
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
  /* color: ${({ theme }) => theme.color}; */
  color: none;
  height: ${({ height }) => height || '1x'};
  background: ${({ theme }) => theme.color};
  border-radius: 10px;
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
    <Divider height='10px' />
  </Article>
);


PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};


export default memo(PostCard);
