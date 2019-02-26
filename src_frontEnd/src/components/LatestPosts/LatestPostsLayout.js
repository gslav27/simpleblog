import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';



const Section = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;


const LatestPostsLayout = ({ latestPostsLoading, postCards }) => (
  <Section
    // aria-describedby='loading'
    aria-busy={latestPostsLoading}
  >
    { postCards }
  </Section>
);


LatestPostsLayout.propTypes = {
  latestPostsLoading: PropTypes.bool.isRequired,
  postCards:          PropTypes.node.isRequired,
};


export default LatestPostsLayout;
