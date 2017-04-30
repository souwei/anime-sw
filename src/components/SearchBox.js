import React from 'react'
import './SearchBox.css'
import Fetch from 'node-fetch'

export default class SearchBox extends React.Component {
  constructor(props){
    super(props)
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
  render(){
    return <input type="text" />
  }
}
