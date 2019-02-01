import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DeleteButton from '../../UI/IconButtonDelete';
import Spinner from '../../UI/Spinner';

import AddNewComment from '../../../containers/AddNewComment';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-height: 110px;
  margin: 0px 0px 10px;
  padding: 0px 15px;
  border: 1px solid #eee;
  border-radius: 3px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

const HeaderText = styled.div`
`;

const Title = styled.h5`
  font-size: 0.9em;
  color: rgb(98, 113, 166);
  margin: 0;
  margin-bottom: -7px;
  text-transform: capitalize;
`;

const SubTitle = styled.span`
  font-size: 0.7em;
  color: #999;
  font-weight: 900;
`;

const HeaderButtons = styled.div`
  position: relative;
  top: -15px;
  right: -15px;
`;

const Body = styled.p`
  font-size: 0.9em;
  margin: 5px 0px 0px;
  color: #000;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
`;


const Comment = ({ author, date, body, onDelete, _id }) => (
  <Container>
    {
    !author
      ? <Spinner size={35} />
      : (
        <>
          <Header>
            <HeaderText>
              <Title>{author}</Title>
              <SubTitle>{date}</SubTitle>
            </HeaderText>
            <HeaderButtons>
              <DeleteButton
                type='button'
                onClick={() => onDelete(_id)}
                title='delete comment'
              />
            </HeaderButtons>
          </Header>
          <Body>{body}</Body>
          <Footer>
            <AddNewComment
              onSubmit={(...params) => console.log(_id, params)}
              commentType='subComment'
            />
          </Footer>
        </>
      )
  }
  </Container>
);


Comment.propTypes = {
  _id:      PropTypes.string.isRequired,
  body:     PropTypes.string,
  author:   PropTypes.string,
  date:     PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  body: '',
  author: '',
  date: '',
};

export default memo(Comment);
