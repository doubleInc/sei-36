import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class RepoListContainer extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    fetch: PropTypes.func
  };
  state = { repos: null, loading: false, error: null };

  static defaultProps = { fetch: axios.get }; // default fetch method

  componentDidMount() {
    this.props
      .fetch(
        `https://api.github.com/users/${this.props.username}/repos?per_page=100&sort=pushed`
      )
      .then(
        ({ data: repos }) =>
          this.setState({ repos, error: null, loading: false }),
        //handle error
        error => this.setState({ repos: null, error, loading: false })
      );
  }

  render() {
    const { repos } = this.state;
    const { username } = this.props;
    return (
      <div>
        {!repos ? null : <RepoList username={username} repos={repos} />}
      </div>
    );
  }
}

// repo as a list
function RepoList({ username, repos }) {
  return (
    <div>
      <h1>{username}'s repos</h1>
      <ul style={{ textAlign: "left" }}>
        {repos.map(repo => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
}

// RepoList.propTypes = {
//   username: PropTypes.string.isRequired,
//   repos: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired
//     })
//   ).isRequired
// };

export default RepoListContainer;
