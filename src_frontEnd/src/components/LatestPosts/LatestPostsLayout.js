import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { latestPostsPropType } from '_Utils_/types/types';
import PostCard from './components/PostCard';


const Section = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;


const LatestPostsLayout = ({ latestPostsLoading, posts, postDeletion, onPostOpen, onPostDelete }) => (
  <Section
    // aria-describedby='loading'
    aria-busy={latestPostsLoading}
  >
    {
      posts.map(post => (
        <PostCard
          key={post._id}
          postDeletion={!post.title && postDeletion}
          onOpen={onPostOpen}
          onDelete={onPostDelete}
          {...post}
        />
      ))
    }
  </Section>
);


LatestPostsLayout.propTypes = {
  posts:              latestPostsPropType.isRequired,
  latestPostsLoading: PropTypes.bool.isRequired,
  postDeletion:       PropTypes.bool.isRequired,
  onPostOpen:         PropTypes.func.isRequired,
  onPostDelete:       PropTypes.func.isRequired,
};


export default LatestPostsLayout;
