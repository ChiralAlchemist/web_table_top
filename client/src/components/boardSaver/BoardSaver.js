import React from 'react';
import axios from 'axios';

class BoardSaver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "default",
      boardNames: []
    };

    this.getBoardStateNames = this.getBoardStateNames.bind(this);
  }
  componentDidMount() {
    this.getBoardStateNames();
  }
  getBoardStateNames () {
    var self = this
    axios.get('/api/boardNames')
    .then(function (response) {
      self.setState({
        boardNames: response.data.boardNames
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  _handleTextChange(e) {
    this.setState({
      fileName: e.target.value
    })
  }
  _handleSubmit(e) {
    e.preventDefault();
    var {fileName} = this.state;
    var boardState = this.props.tableData;
    var savedBoard = {
      boardState: boardState,
      fileName: fileName
    };
    axios.post('/api/boards',savedBoard)
  }
  _handleBoardSelect(e) {
    console.log(e.target.value)
    var self = this
    axios.get(`/api/boards/${e.target.value}`)
    .then(function (response){
      self.props.loadBoardState(response.data.boardState[0].boardState)
    })
  }
  render () {
    var {fileName, boardNames} = this.state;
    return (
      <div>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <h2>Save the current board state</h2>
          <input onChange={(e)=>this._handleTextChange(e)} value={fileName} type="text"></input>
          <button>Save</button>
        </form>
        <h2>Load a saved board State</h2>
        <select onChange={(e)=>this._handleBoardSelect(e)}>
          {boardNames.map(function (board) {
            return (<option key={board._id} value={board.fileName}>{board.fileName}</option>)
          })}
        </select>
      </div>
    )
  }
}

export default BoardSaver;
