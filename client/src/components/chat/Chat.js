import React from "react"
import { Header, Message, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './chat.css'

function Chat(props) {
  var { messages, message, online, handleSubmit, handleChange } = props;
  var username = props.match.params.user
  var onlineStatus = online ? 'online' : 'offline';
  return (
    <Message  className='chat'>
      <Header>
        Chat Room
        <Icon name="comments" size='small'/>

      </Header>
      <h2 className={onlineStatus}>{onlineStatus}</h2>
      <div className='chatDiv'>
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
    </Message>
  );
}

export default withRouter(Chat);
