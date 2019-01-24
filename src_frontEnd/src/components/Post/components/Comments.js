import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Comment from './Comment';
import Spinner from '../../UI/Spinner';


const Header = styled.h3`
  text-transform: lowercase;
  color: ${({ theme }) => theme.color};
  background-color: lightgrey;
  padding: 0.7em 0.2em;
  margin-top: 0;
  margin-bottom: 0.2em;
  border-top: 1px solid ${({ theme }) => theme.color};
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
    position: relative:
    right: 0:
  };
`;


const Comments = ({ comments, waitCurrentPostCommentsFetching }) => {
  const renderComments = () => comments.map(({ id, ...props }) => <Comment key={id} {...props} />);
  return (
    <Fragment>
      <Header> comments
        <Qty>{comments.length}</Qty>
      </Header>
      {!!(comments.length) && renderComments() }
      { waitCurrentPostCommentsFetching && <Spinner /> }
    </Fragment>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      body: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
  waitCurrentPostCommentsFetching: PropTypes.bool.isRequired,
};


export default memo(Comments);
