import React from 'react';
import axios from 'axios';

class BoardSaver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "default",
      boardState: this.props.tableData,
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
    var {boardState, fileName} = this.state;
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
          <input onChange={(e)=>this._handleTextChange(e)} value={fileName} type="text"></input>
          <button>Save</button>
        </form>
        <select onChange={(e)=>this._handleBoardSelect(e)}>
          {boardNames.map(function (board) {
            return (<option value={board.fileName}>{board.fileName}</option>)
          })}

        </select>
      </div>
    )
  }
}

export default BoardSaver;
