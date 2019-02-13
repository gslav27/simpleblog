import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CurrentPostPropsData } from '_Utils_/types/types';
import getLocaleDateString from '_Utils_/getters/getLocaleDateString';
import TextLoadingPlaceholder from '_Ui_/TextLoadingPlaceholder';


const Article = styled.article`
  margin: 50px 0px 20px;
  text-align: center;
  height: ${({ loading }) => (loading ? '101vh' : 'unset')};
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
  return (
    < >
      {paragraphs.map((p, i) => <Text key={i}>{p}</Text>)}
    </>
  );
};


const PostCard = ({ title, author, date, body, bodyLoading }) => (
  <Article loading={bodyLoading}>
    <Title>{title}</Title>
    <SubTitle>by {author}</SubTitle>
    <SubTitle>{getLocaleDateString(date, 'DDMMYYYY-HHMMSS')}</SubTitle>
    <Divider />
    {
      bodyLoading
        ? <TextLoadingPlaceholder rows={['0', '100%', '90%', '95%', '90%', '98%', '85%', '70%']} />
        : (
          <>
            <Body>{body}</Body>
            <Divider height='10px' />
          </>
        )
    }
  </Article>
);


PostCard.propTypes = {
  bodyLoading: PropTypes.bool.isRequired,
  ...CurrentPostPropsData.getTypesSetToRequired(['title', 'author', 'date']),
};

PostCard.defaultProps = CurrentPostPropsData.defaultValues;

export default memo(PostCard);
