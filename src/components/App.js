import React from 'react';
import Card from './Card';
import SearchBox from './SearchBox'
export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return <div>
      <Card />
      <SearchBox />
      <SearchBox />
      <hr />
      <SearchBox />
    </div>
  }

}
