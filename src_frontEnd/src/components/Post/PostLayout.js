import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PostCard from './components/PostCard';
import Comments from './components/Comments';
import AddComment from './components/AddComment';
import Spinner from '../UI/Spinner';


const PostLayout = ({ post, comments, handleAddNewComment, ...props }) => (
  <section>
    {
      props.waitCurrentPostFetching
        ? <Spinner />
        : (
          <Fragment>
            <PostCard
              title={post.title}
              author={post.author}
              date={post.date}
              body={post.body}
            />
            {
              props.waitCurrentPostCommentsFetching
                ? <Spinner />
                : (
                  <Fragment>
                    <Comments comments={comments} />
                    <hr />
                    <AddComment onChange={handleAddNewComment} />
                  </Fragment>
                )
            }
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
