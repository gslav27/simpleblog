import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentPost,
  getCurrentPostComments,
  getPostLoadingStatus,
  getCommentsLoadingStatus,
} from '../selectors/postSelectors';
import { getFormattedDate } from '../selectors/commonSelectors';

import {
  getPostData,
  getPostComments,
  postNewComment,
  cleanUpCurrentPost,
  deleteComment,
} from '../store/actions/postsActions';

import PostLayout from '../components/Post/PostLayout';



class Post extends Component {
  constructor(props) {
    super(props);
    this.handleAddNewComment = this.handleAddNewComment.bind(this);
  }

  async componentDidMount() {
    const { match, getPostData, getPostComments } = this.props;
    await getPostData(match.params.postId);
    getPostComments(match.params.postId);
  }

  componentWillUnmount() {
    this.props.cleanUpCurrentPost();
  }

  handleAddNewComment({ text: body, author }) {
    const { match, postNewComment } = this.props;
    const { postId } = match.params;
    const data = {
      date: getFormattedDate(),
      postId: Number(postId) || postId,
      author,
      body,
    };
    postNewComment(data);
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
  currentPost:          PropTypes.object.isRequired,
  currentPostComments:  PropTypes.arrayOf(PropTypes.object).isRequired,
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
