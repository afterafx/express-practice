import React from 'react';
import '../css/CommentItem.css';

class CommentItem extends React.Component {
  render() {
    const { comment, onDeleteItem } = this.props;
    return (
      <div className="message-board-comment-item">
        <p>{comment.text}</p>
        <button type="button" className="delete-button" onClick={onDeleteItem}>
          x
        </button>
        <button type="button" className="edit-button">
          Edit
        </button>
      </div>
    );
  }
}

export default CommentItem;
