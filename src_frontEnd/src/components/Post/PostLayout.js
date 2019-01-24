import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PostCard from './components/PostCard';
import Comments from './components/Comments';
import AddComment from './components/AddComment';
import Spinner from '../UI/Spinner';


const PostLayout = ({ post, comments, ...props }) => (
  <section>
    {
      props.waitCurrentPostFetching
        ? <Spinner />
        : (
          <Fragment>
            <PostCard {...post} />
            <Comments
              comments={comments}
              waitCurrentPostCommentsFetching={props.waitCurrentPostCommentsFetching}
            />
            <AddComment onChange={props.handleAddNewComment} />
          </Fragment>
        )
    }
  </section>
);


PostLayout.propTypes = {
  waitCurrentPostFetching: PropTypes.bool.isRequired,
  waitCurrentPostCommentsFetching: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddNewComment: PropTypes.func.isRequired,
};


export default PostLayout;
