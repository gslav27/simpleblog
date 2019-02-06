import React, { memo } from 'react';
import styled from 'styled-components';

import { CurrentPostPropsData } from '_Utils_/types/types';


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



export const Body = ({ children: text }) => {
  const paragraphs = text.split('\n');
  // console.log(paragraphs);
  return (
    <>
      {paragraphs.map((p, i) => <Text key={i}>{p}</Text>)}
    </>
  );
};


const PostCard = ({ title, author, date, body }) => (
  <Article>
    <Title>{title}</Title>
    <SubTitle>by {author}</SubTitle>
    <SubTitle>{date}</SubTitle>
    <Divider />
    <Body>{body}</Body>
    <Divider height='10px' />
  </Article>
);


PostCard.propTypes = CurrentPostPropsData.getTypesSetToRequired();

export default memo(PostCard);
