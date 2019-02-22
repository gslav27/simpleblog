import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  currentPostPropType,
  mainCommentsPropType,
} from '_Utils_/types/types';
import Spinner from '_Ui_/Spinner';
import PostCard from './components/PostCard';
import Comments from './components/Comments';
import AddNewComment from '../../containers/AddNewComment';


const Section = styled.section`
  height: ${({ loading }) => (loading ? '85vh' : 'unset')};
`;


const PostLayout = ({ post, postLoading, handleAddNewComment, ...otherProps }) => (
  <Section
    loading={postLoading && !post.title}
    aria-busy={postLoading}
  >
    {
      postLoading && !post.title
        ? <Spinner />
        : (
          < >
            <PostCard bodyLoading={postLoading} {...post} />
            {
              !postLoading && (
                < >
                  <AddNewComment onSubmit={handleAddNewComment} commentType='main' />
                  <Comments
                    {...otherProps}
                  />
                </>
              )
            }
          </>
        )
    }
  </Section>
);


PostLayout.propTypes = {
  post:                 currentPostPropType.isRequired,
  mainComments:         mainCommentsPropType.isRequired,
  commentsQty:          PropTypes.number.isRequired,
  postLoading:          PropTypes.bool.isRequired,
  commentsLoading:      PropTypes.bool.isRequired,
  handleAddNewComment:  PropTypes.func.isRequired,
};


export default PostLayout;
