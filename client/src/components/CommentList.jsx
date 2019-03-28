import React from 'react';
import '../css/CommentList.css';
import CommentItem from './CommentItem';

class CommentList extends React.Component {
  render() {
    const { comments, onDelete } = this.props;
    return (
      <div className="message-board-comment-list">
        {comments.map(comment => (
          <CommentItem comment={comment} key={comment.id} onDeleteItem={() => onDelete(comment.id)} />
        ))}
      </div>
    );
  }
}

export default CommentList;
