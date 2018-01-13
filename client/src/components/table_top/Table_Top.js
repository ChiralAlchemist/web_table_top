import React from 'react';
import axios from 'axios';
import Board from '../../components/board/board';
import BoardSaver from '../../components/boardSaver/BoardSaver';
import BoardManipulator from '../../components/boardManipulator/BoardManipulator';
import Chat from '../../components/chat/Chat';
import ImageAdder from '../../components/imageAdder/ImageAdder';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import w3 from './img_w3slogo.gif'
import './table_top.css'
import ReconnectingWebsocket from '../../components/reconnectingWebsocket/ReconnectingWebsocket';
const webSocketurl = "wss://web-table-top-websocket.herokuapp.com//" //'ws://localhost:3001'
const socket = new ReconnectingWebsocket();
socket.open(webSocketurl)
socket.onopen = function(e){
	console.log("WebSocketClient connected:",e);
}
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
      addingImage: null,
      messages: ['First message'],
      message: '',
      images: []
    };
    const self = this;
    setUpWebSocket()

    function setUpWebSocket () {
      socket.onmessage = function(event) {
        console.log("table_top event", event)
        var socketObj = JSON.parse(event.data)
        if(socketObj.type==="board"){
          self.setState({
            tableData: socketObj.data
          })
        } else if (socketObj.type==="chat") {
          var newMessages = [...self.state.messages,socketObj.user+": "+ socketObj.data]
          self.setState({
            messages: newMessages
          })
        }
      }
    }
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.addImage = this.addImage.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.loadBoardState = this.loadBoardState.bind(this);
    this._loadImages = this._loadImages.bind(this);
  }
  addImage (image) {
    this.setState({
      addingImage: image
    })
  }
  componentDidMount() {
    this._loadImages()
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
  handleChatSubmit(event, message, username) {
    console.log(arguments)
    event.preventDefault();
    var { messages } = this.state
    var newMessage = username + ": " + message;
    var socketData = JSON.stringify({
      type : 'chat',
      data : message,
      user : username
    })
    socket.send(socketData);
    this.setState({
      messages: [...messages, newMessage],
      message : ""
    });
  }
  handleDrag (startingPosition) {
    this.setState({
      startingPosition
    })
  }
  handleMessageChange(event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    console.log(value)
    this.setState({
      [name]: value
    });
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
    socket.send(socketData);
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
  _loadImages (e) {
    var self = this;
    axios.get('/api/images')
    .then(function (response) {
      console.log(response)
      self.setState({
        images: [...response.data.images]
      })

    })
  }
  render () {
    var self = this;
    var {tableData, messages, message, images} = this.state
    return (
    <div className="table_topContainer">
      <div className='boardContainer'>
        <Board
          handleDrag={self.handleDrag}
          handleDrop={self.handleDrop}
          tableData={tableData}>
        </Board>
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
      <div className='chatContainer'>
        <Chat
          online={socket.online}
          message={message}
          messages={messages}
          handleSubmit={self.handleChatSubmit}
          handleChange={self.handleMessageChange}></Chat>
      </div>
      <div className='imageContainer'>
        <h1>Image Center</h1>
        <ImageUpload></ImageUpload>
        <ImageAdder
          addImage={self.addImage}
          imageLoad={self._loadImages}
          images={images}>
        </ImageAdder>
      </div>

  </div>
  )
  }
}

export default TableTop;
