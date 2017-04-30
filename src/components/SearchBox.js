import React from 'react'
import './SearchBox.css'

export default class SearchBox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  render(){
    return <input type="text" />
  }
}
