import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { routes } from '_Utils_/constants';
import Spinner from '_Ui_/Spinner';
import DeletePostButton from './DeletePostButton';



const Container = styled.section`
  flex: 1 1 260px;
  display: flex;
  justify-content: center;
  align-items: center;
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


const PostCard = ({ title, description, author, date, onDelete, id, _id }) => (
  <Container>
    {
      !title
        ? <Spinner size={35} />
        : (
          <>
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
              <DeletePostButton onClick={() => onDelete(_id)} />
            </TopRightContainer>
          </>
        )
    }
  </Container>
);

PostCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),                     // 'id' is postId for Router and connection between PostComments & PostItems
  _id: PropTypes.string,  // '_id' is item's REST API (restdb) database id
};

PostCard.defaultProps = {
  title: '',
  description: '',
  author: '',
  date: '',
  id: '',
  _id: '',
};


export default memo(PostCard);
