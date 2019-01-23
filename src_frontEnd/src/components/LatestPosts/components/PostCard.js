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
`;

const Title = styled.h2`
  margin: 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid lightgrey;
  padding: 1em 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  font-size: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid lightgrey;
  padding: 0.5em 0;
`;

const FooterText = styled.div`
  color: grey;
  font-size: 0.9em;
  font-weight: bold;
`;


const PostCard = ({ title, description, author, date, onChange }) => (
  <Article onClick={onChange} title='read article'>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Footer>
      <FooterText>{author}</FooterText>
      <FooterText>{date}</FooterText>
    </Footer>
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
