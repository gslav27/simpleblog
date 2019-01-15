import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostCard from './components/PostCard';
import Spinner from '../UI/Spinner';

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;



const LatestPostsLayout = ({ waitLatestPostFetching, onChange, posts }) => (
  <Section>
    {
      waitLatestPostFetching
        ? <Spinner />
        : (
          posts.map(({ body, id, ...post }) => (
            <PostCard
              key={id}
              onChange={() => onChange(id)}
              {...post}
            />
          )))
    }
  </Section>
);


LatestPostsLayout.propTypes = {
  waitLatestPostFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
};


export default LatestPostsLayout;
