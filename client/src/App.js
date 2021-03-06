import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Signup from './components/signup/Signup'
import TableTop from './components/table_top/Table_Top'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        {/* <ul>
          <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        </ul> */}
        <Route exact path="/" component={Signup}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Signup}/>
        <Route path="/protected/:user" component={TableTop} />
        </div>
      </Router>
    );
  }
}


export default App;
