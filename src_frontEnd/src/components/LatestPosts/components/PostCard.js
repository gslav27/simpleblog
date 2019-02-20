import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { PostPropsData } from '_Utils_/types/types';
import { routes } from '_Utils_/constants/constants';
import getLocaleDateString from '_Utils_/getters/getLocaleDateString';
import Placeholder from '_Ui_/TextLoadingPlaceholder';
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
  min-height: 400px;
  & button {
    visibility: hidden;
  };
  &:hover {
    ${({ loading }) => !loading && (`
      cursor: pointer;
      box-shadow: 0px 0px 10px black;
    `)}
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
  width: 100%;
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

const StyledPlaceholder = styled(Placeholder)`
  margin: 10px 0px;
`;


const PostCardPlaceholder = () => (
  <Article title='loading'>
    <Title>
      <StyledPlaceholder rows={['100%']} height='1.4em' />
    </Title>
    <div>
      <StyledPlaceholder rows={['100%', '100%', '100%', '100%', '75%']} height='1em' />
    </div>
    <Footer>
      <StyledPlaceholder width='40%' height='0.8em' />
      <StyledPlaceholder width='25%' height='0.8em' />
    </Footer>
  </Article>
);


const PostCard = ({ onOpen, onDelete, ...props }) => (
  <Container loading={!props.title}>
    {
      !props.title
        ? <PostCardPlaceholder />
        : (
          <>
            <StyledLink
              to={`${process.env.PUBLIC_URL}${routes.posts}/${props.id}`}
              title='read article'
              onClick={() => onOpen(props)}
            />
            <Article title='read article'>
              <Title>{props.title}</Title>
              <Description>{props.description}</Description>
              <Footer>
                <FooterText>{props.author}</FooterText>
                <FooterText>{getLocaleDateString(props.date)}</FooterText>
              </Footer>
            </Article>
            <TopRightContainer>
              <DeletePostButton onClick={() => onDelete(props._id)} />
            </TopRightContainer>
          </>
        )
    }
  </Container>
);

PostCard.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  ...PostPropsData.types,
};

PostCard.defaultProps = PostPropsData.defaultValues;


export default memo(PostCard);
