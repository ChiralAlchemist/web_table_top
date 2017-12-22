import React from "react"
import { withRouter } from 'react-router-dom';
const socket = new WebSocket('ws://localhost:3001')


socket.addEventListener('open', function(event) {
  socket.send('hello sever')
})
class Chat extends React.Component{
  constructor(props) {
   super(props);
   this.state = {
     messages: ['First message'],
     message: '',
     username: this.props.match.params.user
   };
   var messages = this.state.messages;
   console.log(this.state.username)
   var self = this;
   socket.addEventListener('message', function(event) {
     console.log('Message from the sever', event.data)
     var newMessages = [...self.state.messages, event.data]
     self.setState({
       messages: newMessages
     })
   })

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log('called')
    event.preventDefault();
    var message = this.state.username + ": " + this.state.message;
    socket.send(message);
    console.log(this.state.messages)
    var newMessage = [...this.state.messages, message]
    this.setState({
      messages: newMessage,
      message : ""
    });
  }
  render () {
    return (
      <div>
        <div>
          <ul>
            {this.state.messages.map(function (message){
              return (<li>{message}</li>)
            })
            }
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type='text'
            name='message'
            value= {this.state.message}
            onChange={this.handleChange}>
          </input>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    );
  }
}

export default withRouter(Chat);
