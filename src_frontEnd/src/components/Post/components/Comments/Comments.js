import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { mainCommentsPropType } from '_Utils_/types/types';
import Spinner from '_Ui_/Spinner';
import Comment from '../../../../containers/Comment';


const Header = styled.h3`
  text-transform: capitalize;
  color: ${({ theme }) => theme.color};
  padding: 10px 0px 5px;
  margin: 0;
  font-size: 0.9em;
`;

const Qty = styled.i`
  color: ${({ theme }) => theme.color};
  &:before {
    content: ' (';
    position: relative;
    left: 0;
  };
  &:after {
    content: ')';
    position: relative;
    right: 0;
  };
`;

const Text = styled.p`
  color: #999;
  font-weight: 900;
  text-align: center;
`;


export const CommentsList = ({ mainComments }) => (
  mainComments.length
    ? (
      mainComments.map(_id => (
        <Comment
          key={_id}
          _id={_id}
        />
      ))
    )
    : <Text>There are no comments yet.</Text>
);


const CommentsSection = ({ mainComments, commentsQty, commentsLoading }) => (
  <>
    <Header>
      comments
      <Qty>{commentsQty}</Qty>
    </Header>
    {
      commentsLoading
        ? <Spinner />
        : <CommentsList mainComments={mainComments} />
    }
  </>
);


CommentsSection.propTypes = {
  mainComments:     mainCommentsPropType.isRequired,
  commentsLoading:  PropTypes.bool.isRequired,
  commentsQty:      PropTypes.number.isRequired,
};


export default CommentsSection;
