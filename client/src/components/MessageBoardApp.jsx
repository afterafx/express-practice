import React from 'react';
import CommentList from './CommentList';
import '../css/MessageBoardApp.css';
import commentData from '../data';

// pass comments down to Commentlist (using props)
// create a commentitem component
// render a single commentItem with the data from the first comment (aka comments[0])
// Dont forget CSS

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: commentData,
    };
  }

  render() {
    return (
      <div className="message-board-app">
        <nav>
          <form>
            <input type="text" name="search" placeholder="Search" />
            <button type="submit">Search</button>
          </form>
        </nav>
        <CommentList comments={this.state.comments} />
        <div className="add-comment">
          <form>
            <input type="text" name="comment" placeholder="Your opinion here" />
            <button type="submit">Comment</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageBoardApp;
