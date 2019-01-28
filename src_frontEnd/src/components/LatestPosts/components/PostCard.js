import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DeletePostButton from './DeletePostButton';
import { routes } from '../../../constants';


const Container = styled.section`
  box-sizing: border-box;
  flex: 1 1 260px;
  position: relative;
  border: 2px solid black;
  border-radius: 3px;
  margin: 1em;
  max-width: 290px;
  & button {
    visibility: hidden;
  };
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px black;
    & button {
      visibility: visible;
    };
  };
`;

const TopRightContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  padding: 5px 20px;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
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


const PostCard = ({ title, description, author, date, onDelete, id }) => (
  <Container>
    <StyledLink to={`${process.env.PUBLIC_URL}${routes.posts}/${id}`} title='read article' />
    <Article title='read article'>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Footer>
        <FooterText>{author}</FooterText>
        <FooterText>{date}</FooterText>
      </Footer>
    </Article>
    <TopRightContainer>
      <DeletePostButton onClick={onDelete} />
    </TopRightContainer>
  </Container>
);


PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};


export default PostCard;
