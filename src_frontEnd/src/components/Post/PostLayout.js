import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spinner from '_Ui_/Spinner';



const Section = styled.section`
  height: ${({ loading }) => (loading ? '85vh' : 'unset')};
`;


const PostLayout = ({ postSection, commentsSection, postLoading, postBodyLoading }) => (
  <Section
    loading={postLoading}
    aria-busy={postLoading}
  >
    {
      postLoading
        ? <Spinner />
        : (
          < >
            { postSection }
            { !postBodyLoading && commentsSection }
          </>
        )
    }
  </Section>
);


PostLayout.propTypes = {
  postLoading:        PropTypes.bool.isRequired,
  postBodyLoading:    PropTypes.bool.isRequired,
  postSection:        PropTypes.node.isRequired,
  commentsSection:    PropTypes.node.isRequired,
};


export default PostLayout;
