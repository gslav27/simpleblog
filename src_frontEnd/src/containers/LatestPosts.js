import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { latestPostsPropType } from '_Utils_/types/types';

import {
  getLatestPosts,
  deletePost,
} from '../store/posts/postsActionCreators';

import {
  getLatestPosts as getLatestPostsSelector,
  getLatestPostsLoadingStatus,
} from '../store/posts/postsSelectors';

import LatestPostsLayout from '../components/LatestPosts/LatestPostsLayout';



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
    const { latestPosts, latestPostsLoading } = this.props;

    return (
      <LatestPostsLayout
        posts={latestPosts}
        latestPostsLoading={latestPostsLoading}
        onPostDelete={this.handleDeletePost}
      />
    );
  }
}


LatestPosts.propTypes = {
  latestPosts:        latestPostsPropType.isRequired,
  latestPostsLoading: PropTypes.bool.isRequired,
  getLatestPosts:     PropTypes.func.isRequired,
  deletePost:         PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  latestPosts:        getLatestPostsSelector(state),
  latestPostsLoading: getLatestPostsLoadingStatus(state),
});


const mapDispatchToProps = {
  getLatestPosts,
  deletePost,
};


export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);
