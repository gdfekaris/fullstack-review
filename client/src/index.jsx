import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { isArray } from 'util';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.list = this.list.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post("/repos", { username: term }, function(data) {
      //this.list();
      console.log('POST sent');
    });
  }

  componentDidMount(){
    $.get("/repos").then((data) => {
      //console.log(data)
      if (this.state.repos.length !== data.length) {
        this.setState({ repos: data });
      }
    })
  }

  list() {
   let n = 0;
   let topRepos = this.state.repos.splice(9)
   return topRepos.map((repo) => {
     n = n + 1
      return (
        <span key={repo._id}>
          <a href={repo.repoURL}>{n}.) {repo.repoURL}</a>
          <br />
        </span>
      )
    });
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} numberOfRepos={this.state.repos.length}/>
      <Search onSearch={this.search.bind(this)}/>
      <br />
      <div>Top Repos:</div>
      <br />
      {this.list()}
      <br />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));