import React from "react"
class Chat extends React.Component{
  constructor(props) {
   super(props);
   this.state = {
     messages: 'First message',
     message: ''
   };
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
    this.setState({
      messages: this.state.messages + "/n" + this.state.message,
      message : ""
    });
  }
  render () {
    return (
      <div>
        <div>
          {this.state.messages}
        </div>
        <input type='text'
          name='message'
          value= {this.state.message}
          onChange={this.handleChange}>

        </input>
      <button type='submit' onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

export default Chat;
