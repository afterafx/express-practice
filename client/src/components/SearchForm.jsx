import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchCommentValue: '',
    };
  }

  handleChange = event => {
    this.setState({ searchCommentValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearchComment(this.state.searchCommentValue);
    this.setState({ searchCommentValue: '' });
  };

  render() {
    return (
      <nav>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.searchCommentValue}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default SearchForm;
