import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchLatestPosts } from '../operations/postsOperations';

import LatestPostsLayout from '../components/LatestPosts/LatestPostsLayout';

class LatestPosts extends Component {
  constructor(props) {
    super(props);
    this.handlePostClick = this.handlePostClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchLatestPosts();
  }

  handlePostClick(postId) {
    const { history } = this.props;
    const historyPath = `/posts/${postId}`;
    history.push(historyPath);
  }
  
  render() {
    const { latestPosts, waitLatestPostFetching } = this.props;

    return (
      <LatestPostsLayout
        posts={latestPosts}
        waitLatestPostFetching={waitLatestPostFetching}
        onChange={this.handlePostClick}
      />
    );
  }
}

LatestPosts.propTypes = {
  latestPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
  waitLatestPostFetching: PropTypes.bool.isRequired,
  fetchLatestPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  latestPosts: state.posts.latestPosts,
  waitLatestPostFetching: state.posts.waitLatestPostFetching,
});

const mapDispatchToProps = { fetchLatestPosts };

export default connect(mapStateToProps, mapDispatchToProps)(LatestPosts);
