import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  currentPostPropType,
  mainCommentsPropType,
} from '_Utils_/types/types';
import getCurrentDate from '_Utils_/getters/getCurrentDate';

import {
  getCurrentPost,
  getPostLoadingStatus,
} from '../store/posts/postsSelectors';

import {
  getCommentsLoadingStatus,
  getCurrentPostMainComments,
  getCommentsQty,
} from '../store/comments/commentsSelectors';

import {
  getPostData,
  cleanUpCurrentPost,
} from '../store/posts/postsActionCreators';

import {
  getPostComments,
  postNewComment,
} from '../store/comments/commentsActionCreators';

import PostLayout from '../components/Post/PostLayout';

// import Spinner from '_Ui_/Spinner';
import PostCard from '../components/Post/components/PostCard';
import Comments from '../components/Post/components/Comments';
import AddNewComment from './AddNewComment';


class Post extends Component {
  constructor(props) {
    super(props);
    this.handleAddNewComment = this.handleAddNewComment.bind(this);
  }

  async componentDidMount() {
    const {
      match,
      getPostData,
      getPostComments,
    } = this.props;
    window.scrollTo(0, 0);
    this.handleDocumentTitle();
    await getPostData(match.params.postId);
    getPostComments(match.params.postId);
  }

  componentDidUpdate(prevProps) {
    (this.props.currentPost.title !== prevProps.currentPost.title) && this.handleDocumentTitle();
  }

  componentWillUnmount() {
    this.props.cleanUpCurrentPost();
    document.title = 'SimpleBlog';
  }

  handleAddNewComment(data) {
    const {
      match,
      postNewComment,
    } = this.props;
    const { postId } = match.params;
    const mainData = {
      date: getCurrentDate(),
      postId: Number(postId) || postId,
      author: data.author,
      body: data.text,
    };
    postNewComment(mainData);
  }

  handleDocumentTitle() {
    const { currentPost } = this.props;
    document.title = (currentPost.title || 'SimpleBlog');
  }

  render() {
    const {
      currentPost,
      mainComments,
      commentsQty,
      postLoading,
      commentsLoading,
    } = this.props;

    return (
      <PostLayout
        postLoading={postLoading && !currentPost.title}
        postBodyLoading={postLoading}
        postSection={(
          <PostCard
            bodyLoading={postLoading}
            {...currentPost}
          />
        )}
        commentsSection={(
          < >
            <AddNewComment
              onSubmit={this.handleAddNewComment}
              commentType='main'
            />
            <Comments
              mainComments={mainComments}
              commentsQty={commentsQty}
              commentsLoading={commentsLoading}
            />
          </>
        )}
      />
    );
  }
}


Post.propTypes = {
  currentPost:              currentPostPropType.isRequired,
  mainComments:             mainCommentsPropType.isRequired,
  commentsQty:              PropTypes.number.isRequired,
  postLoading:              PropTypes.bool.isRequired,
  commentsLoading:          PropTypes.bool.isRequired,
  match:                    PropTypes.shape({ data: PropTypes.shape({ postId: PropTypes.string }) }).isRequired,
  getPostData:              PropTypes.func.isRequired,
  getPostComments:          PropTypes.func.isRequired,
  postNewComment:           PropTypes.func.isRequired,
  cleanUpCurrentPost:       PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  currentPost:              getCurrentPost(state),
  mainComments:             getCurrentPostMainComments(state),
  commentsQty:              getCommentsQty(state),
  postLoading:              getPostLoadingStatus(state),
  commentsLoading:          getCommentsLoadingStatus(state),
});


const mapDispatchToProps = {
  getPostData,
  getPostComments,
  postNewComment,
  cleanUpCurrentPost,
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);
