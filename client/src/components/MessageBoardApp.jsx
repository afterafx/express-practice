import React from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';
import SearchForm from './SearchForm';
import '../css/MessageBoardApp.css';

// pass comments down to Commentlist (using props)
// create a commentitem component
// render a single commentItem with the data from the first comment (aka comments[0])
// Dont forget CSS

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    // set inital state
    this.state = {
      comments: [],
    };
  }

  // lifecycle hook ran after component is loaded into DOM
  componentDidMount() {
    axios
      .get('https://afterafx-express-practice.herokuapp.com/api/comments')
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.error(error));
  }

  // Delete comment
  handleDelete = id => {
    axios
      .delete(`https://afterafx-express-practice.herokuapp.com/api/comments/${id}`)
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => console.error(error));

    // filter out the comments
    // const updatedComments = this.state.comments.filter(comment => comment.id !== id);
    // set the state
    // this.setState({ comments: updatedComments });
  };

  // Add comment
  handleAddComment = commentText => {
    axios
      .post('https://afterafx-express-practice.herokuapp.com/api/comments/', {
        text: commentText,
      })
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('Please enter comment text!');
        }
      });
  };

  // Search Comment
  handleSearchComment = searchText => {
    axios
      .get(`https://afterafx-express-practice.herokuapp.com/api/comments/`, {
        params: {
          filter: searchText,
        },
      })
      .then(response => this.setState({ comments: response.data }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('Please enter search text!');
        }
      });
  };

  render() {
    return (
      <div className="message-board-app">
        <SearchForm onSearchComment={this.handleSearchComment} />
        <CommentList comments={this.state.comments} onDelete={this.handleDelete} />
        <AddCommentForm onAddComment={this.handleAddComment} />
      </div>
    );
  }
}

export default MessageBoardApp;
