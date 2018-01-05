import React from "react"
import { withRouter } from 'react-router-dom';
import './chat.css'
const webSocketurl = "wss://web-table-top-websocket.herokuapp.com//" //'ws://localhost:3001'

//const socket = new WebSocket(webSocketurl)
//askdfjlasas
class Chat extends React.Component{
  constructor(props) {
   super(props);
   this.state = {
     messages: ['First message'],
     message: '',
     username: this.props.match.params.user,
     online: true
   };
   var self = this;
   this.props.socket.addEventListener('message', function(event) {
     var socketObj = JSON.parse(event.data);
     if(socketObj.type === "chat") {
       var newMessages = [...self.state.messages,socketObj.user+": "+ socketObj.data]
       self.setState({
         messages: newMessages
       })
     }
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
    event.preventDefault();
    var {username, message, messages } = this.state
    var newMessage = username + ": " + message;
    var socketData = JSON.stringify({
      type : 'chat',
      data : message,
      user : username
    })
    if(this.props.socket.readyState===1) {
      this.props.socket.send(socketData);
    } else {
      this.setState({
        online: false
      })
      alert('sockets not connected') // TODO EXPAND ON THIS
    }
    this.setState({
      messages: [...messages, newMessage],
      message : ""
    });
  }
  render () {
    var onlineStatus = this.state.online ? 'online' : 'offline';
    return (
      <div className='chat'>
        <h1>Chat Room</h1>
        <h2 className={onlineStatus}>{onlineStatus}</h2>
        <div>
          <ul className='chatUL'>
            {
              this.state.messages.map(function (message, idx){
                return (<li key = {idx}>{message}</li>)
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
