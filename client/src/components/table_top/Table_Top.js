import React from 'react';
import Board from '../../components/board/board';
import BoardSaver from '../../components/boardSaver/BoardSaver';
import BoardManipulator from '../../components/boardManipulator/BoardManipulator';
import Chat from '../../components/chat/Chat';
import ImageAdder from '../../components/imageAdder/ImageAdder';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import w3 from './img_w3slogo.gif'
import './table_top.css'
const webSocketurl = "wss://web-table-top-websocket.herokuapp.com//" //'ws://localhost:3001'
const socket = new WebSocket(webSocketurl)
//fake data
var empty= {};
var blue = {
  color : "blue",
  number : 2,
  image: w3
}
var startingTblData = [[empty, empty, empty, empty, empty, empty, blue],
                  [empty, empty, empty, empty, empty, empty, blue],
                  [empty, empty, empty, empty, empty, empty, blue],
                  [empty, empty, empty, empty, empty, empty, blue],
                  [empty, empty, empty, empty, empty, empty, blue],
                  [empty, empty, empty, empty, empty, empty, blue],
                  [empty, empty, empty, empty, empty, empty, blue]
                ];
class TableTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingPosition: [0,0],
      endingPosition: [0,0],
      tableData: startingTblData,
      addingImage: null
    };
    const self = this;
    setUpWebSocket()

    function setUpWebSocket () {
      socket.addEventListener('message', function(event) {
        var socketObj = JSON.parse(event.data)
        if(socketObj.type==="board"){
          self.setState({
            tableData: socketObj.data
          })
        }
      })
    }
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.addImage = this.addImage.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.loadBoardState = this.loadBoardState.bind(this);
  }
  addImage (image) {
    this.setState({
      addingImage: image
    })
  }
  handleBoardChange (type, value) {
    var { tableData } = this.state
    var newTable;
    if(type === 'rows') {
      if(value>tableData.length){
        newTable = [...tableData]
        var newRow = tableData[0].map(function () {
          return {}
        })
        for(var i=tableData.length; i<value; i++){
          newTable.push(newRow)
        }
      }
      if(value<tableData.length){
        newTable = tableData.slice(0,value)
      }
      if(value===tableData.length){
        newTable = tableData.slice(0, tableData.length)
      }
    }
    if(type === 'columns'){
      newTable = tableData.map(function (row){
        var newRow
        if(value>row.length){
          newRow= [...row];
          for(var i=row.length; i<value; i++){
            newRow.push({});
          }
        }
        if(value<row.length){
          newRow = row.slice(0,value);
        }
        return newRow;
      })
    }
    this.setState({
      tableData: newTable
    })
  }
  handleDrag (startingPosition) {
    this.setState({
      startingPosition
    })
  }
  handleDrop(endingPosition){
    var {startingPosition, tableData, addingImage} = this.state;
    var newTable;
    if(addingImage){
      newTable = change(tableData,endingPosition, addingImage)
      this.setState({
        addingImage: null
      })
    } else{
      newTable = swap(tableData, startingPosition, endingPosition);
    }
    var socketData = JSON.stringify({
      type: 'board',
      data: newTable
    })
    if(socket.readyState===1) {
      socket.send(socketData);
    } else {
      alert('sockets not connected') // TODO EXPAND ON THIS
    }
    this.setState({
        tableData: newTable
    })
    function swap (matrix, start, end) {
      var temp = matrix[start[0]][start[1]]
      var newMatrix = [
        ...matrix.slice(0,start[0]),
        matrix[start[0]].slice(0,start[1]).concat([matrix[end[0]][end[1]]],
        matrix[start[0]].slice(start[1]+1)),
        ...matrix.slice(start[0]+1)
      ]
      newMatrix[end[0]][end[1]] = temp; // swap 2nd value
      return  newMatrix
    }
    function change(matrix, start,value){
      var newMatrix = [
        ...matrix.slice(0,start[0]),
        matrix[start[0]].slice(0,start[1]).concat([value],
        matrix[start[0]].slice(start[1]+1)),
        ...matrix.slice(start[0]+1)
      ]
      return newMatrix;
    }
  }
  loadBoardState(boardState) {
    console.log("called loadBoardState", boardState)
    this.setState({
      tableData: boardState
    })
  }
  render () {
    var self = this;
    var tableData = this.state.tableData
    var row = tableData.length
    var column = tableData[0].length
    return (
    <div className="table_topContainer">
      <div className='board'>
        <Board
          handleDrag={self.handleDrag}
          handleDrop={self.handleDrop}
          tableData={tableData}>
        </Board>
      </div>
      <div className='chatContainer'>
        <Chat></Chat>
      </div>
      <div className='imageContainer'>
        <h1>Image Center</h1>
        <ImageUpload></ImageUpload>
        <ImageAdder addImage={self.addImage}></ImageAdder>
      </div>
      <div className='boardOporatorContainer'>
        <BoardSaver
          tableData={tableData}
          loadBoardState={self.loadBoardState}>
        </BoardSaver>
        <BoardManipulator
          row={tableData.length}
          column={tableData[0].length}
          boardManipulator={self.handleBoardChange}></BoardManipulator>
      </div>
  </div>
  )
  }
}

export default TableTop;
