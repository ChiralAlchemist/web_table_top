import React from "react"
import { withRouter } from 'react-router-dom';
import './chat.css'

function Chat(props) {
  var { messages, message, online, handleSubmit, handleChange } = props;
  var username = props.match.params.user
  var onlineStatus = online ? 'online' : 'offline';
  return (
    <div className='chat'>
      <h1>Chat Room</h1>
      <h2 className={onlineStatus}>{onlineStatus}</h2>
      <div>
        <ul className='chatUL'>
          {
            messages.map(function (message, idx){
              return (<li key = {idx}>{message}</li>)
            })
          }
        </ul>
      </div>
      <form onSubmit={(e)=>handleSubmit(e, message, username)}>
        <input type='text'
          name='message'
          value= {message}
          onChange={handleChange}>
        </input>
        <input type='submit' value='Submit'></input>
      </form>
    </div>
  );
}

export default withRouter(Chat);
