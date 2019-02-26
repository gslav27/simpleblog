import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { latestPostsPropType } from '_Utils_/types/types';

import {
  getLatestPosts,
  setAvailableCurrentPostData,
  deletePost,
} from '../store/posts/postsActionCreators';

import {
  getLatestPosts as getLatestPostsSelector,
  getLatestPostsLoadingStatus,
  getPostDeletionStatus,
} from '../store/posts/postsSelectors';

import LatestPostsLayout from '../components/LatestPosts/LatestPostsLayout';
import PostCard from '../components/LatestPosts/components/PostCard';



class LatestPosts extends Component {
  constructor(props) {
    super(props);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  componentDidMount() {
    this.props.getLatestPosts();
  }

  async handleDeletePost(_id) {
    await this.props.deletePost(_id);
    this.props.getLatestPosts();
  }
  
  render() {
    const { latestPosts, latestPostsLoading, postDeletion } = this.props;

    return (
      <LatestPostsLayout
        latestPostsLoading={latestPostsLoading}
        postCards={
          latestPosts.map(post => (
            <PostCard
              key={post._id}
              postDeletion={!post.title && postDeletion}
              onOpen={this.props.setAvailableCurrentPostData}
              onDelete={this.handleDeletePost}
              {...post}
            />
          ))
        }
      />
    );
  }
}


LatestPosts.propTypes = {
  latestPosts:                  latestPostsPropType.isRequired,
  latestPostsLoading:           PropTypes.bool.isRequired,
  postDeletion:                 PropTypes.bool.isRequired,
  getLatestPosts:               PropTypes.func.isRequired,
  setAvailableCurrentPostData:  PropTypes.func.isRequired,
  deletePost:                   PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  latestPosts:        getLatestPostsSelector(state),
  latestPostsLoading: getLatestPostsLoadingStatus(state),
  postDeletion:       getPostDeletionStatus(state),
});


const mapDispatchToProps = {
  getLatestPosts,
  setAvailableCurrentPostData,
  deletePost,
};


export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);
