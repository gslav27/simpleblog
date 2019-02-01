import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getLatestPosts,
  deletePost,
} from '../store/actions/postsActions';
import {
  getLatestPosts as getLatestPostsSelector,
  getLatestPostsLoadingStatus,
} from '../selectors/latestPostsSelectors';

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
  latestPosts:        PropTypes.arrayOf(PropTypes.object).isRequired,
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
