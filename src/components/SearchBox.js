import React from 'react'
import './SearchBox.css'
import Fetch from 'node-fetch'

export default class SearchBox extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      searchTerm: ''
    }
  }
  search(keyword){
    fetch(`/api/anime/?title=${keyword}`)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });
  }

  handleChange(event){
    console.log('changing');
    this.setState({ searchTerm: event.target.value });
  }
  render(){
    var searchTerm = this.state.searchTerm;
    return <div>
    <input type="text" onChange={this.handleChange}/>
    <span>{this.state.searchTerm}</span>
    </div>
  }
}
