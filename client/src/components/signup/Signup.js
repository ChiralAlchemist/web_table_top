import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
class Signup extends React.Component{
  constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: '',
     loginType: 'login'
   };

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleLoginData = handleLoginData.bind(this);
   this.handleSignUp = handleSignUp.bind(this);
  }
  changeLoginType (e) {
    e.preventDefault();
    console.log('hello')
    this.setState({
      loginType: 'signup'
    })
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
    let login = self.state.loginType === "login" ? true : false;
    var userInfo = {
      username : this.state.username,
      password : this.state.password
    }
    if(login) {
      sendLogin(userInfo)
      .then(self.handleLoginData)
      .catch(logError)
    } else {
      signup(userInfo)
      .then(self.handleSignUp)
      .catch(logError)
    }
  }

  render () {
    var headerMessage = this.state.loginType === 'login' ? "Log-in to your account" : "Create a username and password"
    return (
      <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='green' textAlign='center'>
            {/* <Image src='/logo.png' /> */}
            {' '} {headerMessage}
          </Header>
          <Form onSubmit={this.handleSubmit} size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='username'
                name='username'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Button color='green' fluid size='large'>{this.state.loginType}</Button>
            </Segment>
          </Form>
          <Message>
            New? <a href='#' onClick={(e)=>this.changeLoginType(e)} >Click Here to Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
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
   this.props.history.push(`protected/${response.data.user.username}`);
 }
}

function handleSignUp (response) {
  if(response.data.success===false ) {
    return alert(response.data.message) // TODO MAKE THIS PRETTIER
  }
  this.props.history.push(`protected/${response.data.user.username}`);
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
