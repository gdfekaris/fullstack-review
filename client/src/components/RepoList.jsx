import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4> Repo List Component </h4>
        There are {this.props.numberOfRepos} repos stored in Github Fetcher.
      </div>
    )
  }
}

export default RepoList;