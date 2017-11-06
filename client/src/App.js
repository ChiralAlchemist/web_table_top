import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import AuthButton from './components/authButton/AuthButton'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import TableTop from './components/table_top/Table_Top'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton/>
        <ul>
          <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        </ul>
        <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Signup}/>
        <Route path="/protected" component={TableTop}/>
        </div>
      </Router>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

export default App;
