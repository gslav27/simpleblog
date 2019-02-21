import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  currentPostPropType,
  currentPostCommentsPropType,
} from '_Utils_/types/types';
import Spinner from '_Ui_/Spinner';
import PostCard from './components/PostCard';
import Comments from './components/Comments';
// import Comments from '../../containers/Comments';
import AddNewComment from '../../containers/AddNewComment';


const Section = styled.section`
  height: ${({ loading }) => (loading ? '85vh' : 'unset')};
`;


const PostLayout = ({ post, comments, postLoading, ...props }) => (
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
            {/* { !postLoading && <CommentsBlock /> } */}
            {
              !postLoading && (
                < >
                  <AddNewComment onSubmit={props.handleAddNewComment} commentType='main' />
                  {/* <AddNewComment onSubmit={handleAddNewComment} commentType='main' /> */}
                  <Comments
                    comments={comments}
                    commentsLoading={props.commentsLoading}
                    onDeleteComment={props.handleDeleteComment}
                    onAddSubcomment={props.handleAddNewComment}
                  />
                  {/* <Comments /> */}
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
  comments:             currentPostCommentsPropType.isRequired,
  postLoading:          PropTypes.bool.isRequired,
  commentsLoading:      PropTypes.bool.isRequired,
  handleAddNewComment:  PropTypes.func.isRequired,
  handleDeleteComment:  PropTypes.func.isRequired,
};


export default PostLayout;
