import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getLatestPosts,
  deletePost,
} from '../operations/postsOperations';

import LatestPostsLayout from '../components/LatestPosts/LatestPostsLayout';

class LatestPosts extends Component {
  componentDidMount() {
    this.props.getLatestPosts();
  }
  
  render() {
    const { latestPosts, latestPostsLoading } = this.props;

    return (
      <LatestPostsLayout
        posts={latestPosts}
        latestPostsLoading={latestPostsLoading}
        onPostDelete={this.props.deletePost}
      />
    );
  }
}

LatestPosts.propTypes = {
  latestPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  latestPostsLoading: PropTypes.bool.isRequired,
  getLatestPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  latestPosts: state.posts.latestPosts,
  latestPostsLoading: state.posts.loading.latestPosts,
});

const mapDispatchToProps = {
  getLatestPosts,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);
