import { Component } from 'react';
import './App.css'

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users.js'

class App extends Component {

  render(){  
    return (
      <div className="App">
        <Navbar title={"123"}/>
        <div className="container">
          <Users />
        </div>
      </div>
    );
  } 
}

export default App;
