import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getCurrentDate from '_Utils_/getters/getCurrentDate';
import { currentPostCommentPropType } from '_Utils_/types/types';

import { getComment } from '../store/comments/commentsSelectors';

import {
  postNewSubComment,
  deleteComment,
  deleteSubComment,
} from '../store/comments/commentsActionCreators';

import Comment from '../components/Post/components/Comment';



class CommentContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddSubComment = this.handleAddSubComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  handleAddSubComment(data) {
    const { comment, postNewSubComment } = this.props;
    const mainData = {
      date: getCurrentDate(),
      postId: Number(comment.postId) || comment.postId,
      author: data.author,
      body: data.text,
    };
    postNewSubComment({ ...mainData, parentCommentId: comment._id });
  }
  
  handleDeleteComment() {
    const { _id, comment } = this.props;
    comment.parentCommentId
      ? this.props.deleteSubComment({ _id, parentCommentId: comment.parentCommentId })
      : this.props.deleteComment(_id);
  }


  render() {
    // console.log('CONTAINER Rseact.Children.count', React.Children.count(this.props.children));
    const {
      type,
      comment,
    } = this.props;
    return (
      <Comment
        type={type}
        onDelete={this.handleDeleteComment}
        onAddSubcomment={this.handleAddSubComment}
        {...comment}
      />
    );
  }
}


CommentContainer.propTypes = {
  _id: PropTypes.string.isRequired,
  type: PropTypes.string,
  postNewSubComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteSubComment: PropTypes.func.isRequired,

  comment: currentPostCommentPropType.isRequired,
};


CommentContainer.defaultProps = { type: 'main' };

const mapStateToProps = (state, props) => ({ comment: getComment(state, props._id) });

const mapDispatchToProps = {
  postNewSubComment,
  deleteComment,
  deleteSubComment,
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
