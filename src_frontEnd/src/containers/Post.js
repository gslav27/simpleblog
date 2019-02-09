import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  currentPostPropType,
  currentPostCommentsPropType,
} from '_Utils_/types/types';
import getCurrentDate from '_Utils_/getters/getCurrentDate';

import {
  getCurrentPost,
  getCurrentPostComments,
  getPostLoadingStatus,
  getCommentsLoadingStatus,
} from '../store/posts/postsSelectors';

import {
  getPostData,
  getPostComments,
  postNewComment,
  cleanUpCurrentPost,
  deleteComment,
} from '../store/posts/postsActionCreators';

import PostLayout from '../components/Post/PostLayout';



class Post extends Component {
  constructor(props) {
    super(props);
    this.handleAddNewComment = this.handleAddNewComment.bind(this);
  }

  async componentDidMount() {
    const { match, getPostData, getPostComments } = this.props;
    window.scrollTo(0, 0);
    this.handleDocumentTitle();
    await getPostData(match.params.postId);
    getPostComments(match.params.postId);
  }

  componentDidUpdate() {
    this.handleDocumentTitle();
  }

  componentWillUnmount() {
    this.props.cleanUpCurrentPost();
    document.title = 'SimpleBlog';
  }

  handleAddNewComment({ text: body, author }) {
    const { match, postNewComment } = this.props;
    const { postId } = match.params;
    const data = {
      date: getCurrentDate(),
      postId: Number(postId) || postId,
      author,
      body,
    };
    postNewComment(data);
  }

  handleDocumentTitle() {
    const { currentPost } = this.props;
    document.title = (currentPost.title || 'SimpleBlog');
  }

  render() {
    const { currentPost, currentPostComments, ...otherProps } = this.props;
    return (
      <PostLayout
        post={currentPost}
        comments={currentPostComments}
        handleAddNewComment={this.handleAddNewComment}
        handleDeleteComment={this.props.deleteComment}
        {...otherProps}
      />
    );
  }
}


Post.propTypes = {
  currentPost:          currentPostPropType.isRequired,
  currentPostComments:  currentPostCommentsPropType.isRequired,
  postLoading:          PropTypes.bool.isRequired,
  commentsLoading:      PropTypes.bool.isRequired,
  match:                PropTypes.shape({ params: PropTypes.shape({ postId: PropTypes.string }) }).isRequired,
  getPostData:          PropTypes.func.isRequired,
  getPostComments:      PropTypes.func.isRequired,
  postNewComment:       PropTypes.func.isRequired,
  deleteComment:        PropTypes.func.isRequired,
  cleanUpCurrentPost:   PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  currentPost:          getCurrentPost(state),
  currentPostComments:  getCurrentPostComments(state),
  postLoading:          getPostLoadingStatus(state),
  commentsLoading:      getCommentsLoadingStatus(state),
});


const mapDispatchToProps = {
  getPostData,
  getPostComments,
  postNewComment,
  deleteComment,
  cleanUpCurrentPost,
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
