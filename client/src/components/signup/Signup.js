import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
class Signup extends React.Component{
  constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: ''
   };

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleLoginData = handleLoginData.bind(this);
   this.handleSignUp = handleSignUp.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    var self = this;
    event.preventDefault();
    let login = self.props.location.pathname === "/login" ? true : false;
    var userInfo = {
      username : this.state.username,
      password : this.state.password
    }
    if(login) {
      sendLogin(userInfo)
      .then(self.handleLoginData)
      .catch(logError)
    } else {
      console.log('sent signup info')
      signup(userInfo)
      .then(self.handleSignUp)
      .catch(logError)
    }
  }

  render () {
    return (
    <div>
      <h3>{this.props.location.pathname}</h3>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          password:
          <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}

/////////
//impementation functions
////////
function handleLoginData (response) {
 if(response.data.success===false){
   alert(response.data.message)
 } else {
   this.props.history.push('protected');
 }
}

function handleSignUp (response) {
  if(response.data.success===false ) {
    return alert(response.data.message) // TODO MAKE THIS PRETTIER
  }
  this.props.history.push('protected');
}

function logError (error) {
  console.log(error);
}

function sendLogin (userInfo) {
  let url = "/api/login";
  return axios.get(url, {
    params: userInfo
  })

}

function signup (userInfo) {
  let url = "/api/users";
  return axios.post(url, userInfo)
}

export default withRouter(Signup);
