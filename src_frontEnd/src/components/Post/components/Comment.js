import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CurrentPostCommentPropsData } from '_Utils_/types/types';
import { getLocaleDateString } from '_Utils_/getters/getLocaleDateString';
import DeleteButton from '_Ui_/IconButtonDelete';
import TextPlaceholder from '_Ui_/TextLoadingPlaceholder';
import Spinner from '_Ui_/Spinner';
import AddNewComment from '../../../containers/AddNewComment';

import SubComments from './SubComments';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  min-height: 110px;
  margin: 0px 0px 10px;
  padding: 0px 15px;
  border: ${({ type }) => (type === 'main' ? `1px solid #eee` : 'none')};
  border-radius: 3px;
  &:last-of-type {
    margin: 0px;
  };
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

const HeaderText = styled.div`
`;

const Title = styled.h5`
  font-size: 0.9em;
  color: rgb(98, 113, 166);
  margin: 0;
  margin-bottom: -7px;
  text-transform: capitalize;
`;

const SubTitle = styled.span`
  font-size: 0.7em;
  color: #999;
  font-weight: 900;
`;

const HeaderButtons = styled.div`
  position: relative;
  top: -15px;
  right: -15px;
`;

const Body = styled.p`
  font-size: 0.9em;
  margin: 5px 0px 0px;
  color: #000;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const FooterText = styled.span`
  font-size: 0.8em;
  color: #999;
`;

const StyledPlaceholder = styled(TextPlaceholder)`
  margin: 0px 0px 10px;
`;



const CommentTextPlaceholder = () => (
  <>
    <Header>
      <HeaderText>
        <Title><StyledPlaceholder rows={['100px']} height='1.2em' /></Title>
        <SubTitle><StyledPlaceholder rows={['150px']} height='0.8em' /></SubTitle>
      </HeaderText>
    </Header>
    <StyledPlaceholder rows={['100%']} height='1em' />
    <Footer>
      <StyledPlaceholder width='50px' height='0.8em' />
    </Footer>
  </>
);



export const CommentPlaceholder = ({ commentDeletion }) => (
  commentDeletion
    ? <Spinner size={35} />
    : <CommentTextPlaceholder />
);



const Comment = ({
  author,
  date,
  body,
  commentDeletion,
  onDelete,
  onAddSubcomment,
  subComments,
  allSubCommentsQty,
  type,
}) => (
  <Container type={type}>
    {
      !author
        ? <CommentPlaceholder commentDeletion={commentDeletion} />
        : (
          <>
            <Header>
              <HeaderText>
                <Title>{author}</Title>
                <SubTitle>{getLocaleDateString(date, 'MMDDYYYY-HHMMSS')}</SubTitle>
              </HeaderText>
              <HeaderButtons>
                <DeleteButton
                  type='button'
                  onClick={onDelete}
                  title='delete comment'
                />
              </HeaderButtons>
            </Header>
            <Body>{body}</Body>

            <Footer>
              <AddNewComment
                onSubmit={onAddSubcomment}
                commentType='subComment'
              />
              <FooterText title='comments qty'> {allSubCommentsQty} </FooterText>
            </Footer>

            {!!subComments.length && (
              <SubComments subComments={subComments} />
            )}
          </>
        )
    }
  </Container>
);


Comment.propTypes = {
  type:             PropTypes.string,
  commentDeletion:  PropTypes.bool.isRequired,
  onDelete:         PropTypes.func.isRequired,
  onAddSubcomment:  PropTypes.func.isRequired,
  ...CurrentPostCommentPropsData.getTypesSetToRequired(['_id']),
};

Comment.defaultProps = { type: 'main' };

export default Comment;
