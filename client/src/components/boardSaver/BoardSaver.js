import React from 'react';
import axios from 'axios';

class BoardSaver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "default",
      boardState: this.props.tableData
    };
  }
  _handleTextChange(e) {
    this.setState({
      fileName: e.target.value
    })
  }
  _handleSubmit(e) {
    e.preventDefault();
    var {boardState, fileName} = this.state;
    var savedBoard = {
      boardState: boardState,
      fileName: fileName
    };
    axios.post('/api/boards',savedBoard)
  }
  render () {
    var {fileName} = this.state;
    return (
      <div>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input onChange={(e)=>this._handleTextChange(e)} value={fileName} type="text"></input>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

export default BoardSaver;
