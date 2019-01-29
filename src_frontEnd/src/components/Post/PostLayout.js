import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PostCard from './components/PostCard';
import Comments from './components/Comments';
import AddNewComment from '../../containers/AddNewComment';
import Spinner from '../UI/Spinner';


const PostLayout = ({ post, comments, ...props }) => (
  <section>
    {
      props.postLoading
        ? <Spinner />
        : (
          <Fragment>
            <PostCard {...post} />
            <Comments
              comments={comments}
              commentsLoading={props.commentsLoading}
              onDeleteComment={props.handleDeleteComment}
            />
            <AddNewComment onSubmit={props.handleAddNewComment} />
          </Fragment>
        )
    }
  </section>
);


PostLayout.propTypes = {
  postLoading: PropTypes.bool.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddNewComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};


export default PostLayout;
