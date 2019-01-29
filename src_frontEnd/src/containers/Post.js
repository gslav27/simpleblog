import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPostData,
  addComment,
  cleanUpCurrentPost,
  deleteComment,
} from '../operations/postsOperations';

import PostLayout from '../components/Post/PostLayout';


class Post extends Component {
  constructor(props) {
    super(props);
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  componentDidMount() {
    // handle URL location (if its specific Post, someones link, page was reloaded, etc)
    const { params } = this.props.match;
    this.props.getPostData(params.postId);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.cleanUpCurrentPost();
  }

  handleNewComment(data) {
    const { params } = this.props.match;
    this.props.addComment({ ...data, postId: params.postId });
  }

  handleDeleteComment(commentId) {
    const { params } = this.props.match;
    this.props.deleteComment(commentId, params.postId);
  }

  render() {
    const { currentPost, currentPostComments, ...otherProps } = this.props;
    return (
      <PostLayout
        post={currentPost}
        comments={currentPostComments}
        handleAddNewComment={this.handleNewComment}
        handleDeleteComment={this.handleDeleteComment}
        {...otherProps}
      />
    );
  }
}

Post.propTypes = {
  currentPost: PropTypes.object.isRequired,
  currentPostComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  postLoading: PropTypes.bool.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape({ params: PropTypes.shape({ postId: PropTypes.string }) }).isRequired,
  getPostData: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  cleanUpCurrentPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentPost: state.posts.currentPost,
  currentPostComments: state.posts.currentPostComments,
  postLoading: state.posts.loading.post,
  commentsLoading: state.posts.loading.comments,
});

const mapDispatchToProps = {
  getPostData,
  addComment,
  cleanUpCurrentPost,
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
