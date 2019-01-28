import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchLatestPosts,
  deletePost,
} from '../operations/postsOperations';

import LatestPostsLayout from '../components/LatestPosts/LatestPostsLayout';

class LatestPosts extends Component {
  componentDidMount() {
    this.props.fetchLatestPosts();
  }
  
  render() {
    const { latestPosts, waitLatestPostFetching } = this.props;

    return (
      <LatestPostsLayout
        posts={latestPosts}
        waitLatestPostFetching={waitLatestPostFetching}
        onPostDelete={this.props.deletePost}
      />
    );
  }
}

LatestPosts.propTypes = {
  latestPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitLatestPostFetching: PropTypes.bool.isRequired,
  fetchLatestPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  latestPosts: state.posts.latestPosts,
  waitLatestPostFetching: state.posts.waitLatestPostFetching,
});

const mapDispatchToProps = {
  fetchLatestPosts,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);
