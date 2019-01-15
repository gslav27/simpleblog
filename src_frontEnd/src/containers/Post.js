import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCurrentPostData,
  addComment,
} from '../operations/postsOperations';

import PostLayout from '../components/Post/PostLayout';


class Post extends Component {
  constructor(props) {
    super(props);
    this.handleNewComment = this.handleNewComment.bind(this);
  }

  componentDidMount() {
    // handle URL location (if its specific Post, someones link, page was reloaded, etc)
    const { params } = this.props.match;
    this.props.fetchCurrentPostData(params.postId);
    window.scrollTo(0, 0);
  }

  shouldComponentUpdate(nextProps) {
    return (
      (this.props.currentPostComments !== nextProps.currentPostComments) ||
      (this.props.waitCurrentPostFetching !== nextProps.waitCurrentPostFetching)
    );
  }

  handleNewComment(...params) {
    this.props.addComment(...params, this.props.currentPost.id);
  }

  render() {
    const { currentPost, currentPostComments, ...otherProps } = this.props;
    return (
      <PostLayout
        post={currentPost}
        comments={currentPostComments}
        handleAddNewComment={this.handleNewComment}
        {...otherProps}
      />
    );
  }
}

Post.propTypes = {
  currentPost: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  currentPostComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      postId: PropTypes.number,
      body: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
  waitCurrentPostFetching: PropTypes.PropTypes.bool.isRequired,
  waitCurrentPostCommentsFetching: PropTypes.bool.isRequired,
  fetchCurrentPostData: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentPost: state.posts.currentPost,
  currentPostComments: state.posts.currentPostComments,
  waitCurrentPostFetching: state.posts.waitCurrentPostFetching,
  waitCurrentPostCommentsFetching: state.posts.waitCurrentPostCommentsFetching,
});

const mapDispatchToProps = {
  fetchCurrentPostData,
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);