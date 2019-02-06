import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { latestPostsPropType } from '_Utils_/types/types';
import Spinner from '_Ui_/Spinner';
import PostCard from './components/PostCard';


const Section = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: ${({ loading }) => (loading ? 'center' : 'unset')};
  height: ${({ loading }) => (loading ? '85vh' : 'unset')};
`;


const LatestPostsLayout = ({ latestPostsLoading, posts, onPostDelete }) => (
  <Section
    loading={latestPostsLoading}
    // aria-describedby='loading'
    aria-busy={latestPostsLoading}
  >
    {
      latestPostsLoading && !posts.length
        ? <Spinner />
        : (
          posts.map(post => (
            <PostCard
              key={post._id}
              onDelete={onPostDelete}
              {...post}
            />
          )))
    }
  </Section>
);


LatestPostsLayout.propTypes = {
  posts:              latestPostsPropType.isRequired,
  latestPostsLoading: PropTypes.bool.isRequired,
  onPostDelete:       PropTypes.func.isRequired,
};


export default LatestPostsLayout;
