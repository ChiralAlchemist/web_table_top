import React from "react"
import { withRouter } from 'react-router-dom';
import './chat.css'
const webSocketurl = "wss://web-table-top-websocket.herokuapp.com//" //'ws://localhost:3001'

//const socket = new WebSocket(webSocketurl)
//askdfjlasas
class Chat extends React.Component{
  constructor(props) {
   super(props);
   var self = this;
   this.state = {
     messages: self.props.messages,
     message: '',
     username: this.props.match.params.user,
     online: true
   };
   // this.props.socket.onmessage = handleMessage
   // this.props.socket.addEventListener('message',
   function handleMessage (event) {
     console.log(event)
    var socketObj = JSON.parse(event.data);
    if(socketObj.type === "chat") {

    }
   }

   // this.handleChange = this.handleChange.bind(this);
   // this.handleSubmit = this.handleSubmit.bind(this);
  }


  render () {
    var {username} = this.state;
    var { message } = this.props;
    var onlineStatus = this.state.online ? 'online' : 'offline';
    return (
      <div className='chat'>
        <h1>Chat Room</h1>
        <h2 className={onlineStatus}>{onlineStatus}</h2>
        <div>
          <ul className='chatUL'>
            {
              this.props.messages.map(function (message, idx){
                return (<li key = {idx}>{message}</li>)
              })
            }
          </ul>
        </div>
        <form onSubmit={(e)=>this.props.handleSubmit(e, message, username)}>
          <input type='text'
            name='message'
            value= {message}
            onChange={this.props.handleChange}>
          </input>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    );
  }
}

export default withRouter(Chat);
