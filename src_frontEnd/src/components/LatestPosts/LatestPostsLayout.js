import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PostCard from './components/PostCard';
import Spinner from '../UI/Spinner';


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
          posts.map(({ body, _id, ...post }) => (
            <PostCard
              key={_id}
              onDelete={() => onPostDelete(_id)}
              {...post}
            />
          )))
    }
  </Section>
);


LatestPostsLayout.propTypes = {
  latestPostsLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      title: PropTypes.string,
      body: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
  onPostDelete: PropTypes.func.isRequired,
};


export default LatestPostsLayout;
