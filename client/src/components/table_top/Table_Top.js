import React from 'react';
import BoardManipulator from '../../components/boardManipulator/BoardManipulator'
import Cell from '../../components/cell/Cell'
import Chat from '../../components/chat/Chat'
import ImageAdder from '../../components/imageAdder/ImageAdder'
import ImageUpload from '../../components/imageUpload/ImageUpload'
import './table_top.css';
import w3 from './img_w3slogo.gif'
const webSocketurl = "wss://web-table-top-websocket.herokuapp.com//" //'ws://localhost:3001'
const socket = new WebSocket(webSocketurl)
//fake data
var green = {
  color : "green",
  number : 1
};
var blue = {
  color : "blue",
  number : 2,
  image: w3
}
var startingTblData = [[green, green, green, green, blue],
                  [green, green, green, green, green]
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
  }
  addImage (e) {
    this.setState({
      addingImage: e
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
    this.setState(
      {
        tableData: newTable
      }
    )
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
  render () {
    var self = this;
    var tableData = this.state.tableData
    return (
    <div>
      <BoardManipulator boardManipulator={self.handleBoardChange}></BoardManipulator>
      <table>
        <tbody>
          {
            tableData.map(function (row, rowIdx) {
              return (
                <tr key={rowIdx}>
                  {
                    row.map(function (cell, colIdx) {
                      var key = rowIdx*10 + colIdx
                      var position = [rowIdx, colIdx]
                      return (
                        <td key={key}>
                          <Cell  position={position}
                            handleDrag ={self.handleDrag}
                            handleDrop ={self.handleDrop}
                            image={cell.image}
                          />
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Chat></Chat>
      <ImageUpload></ImageUpload>
      <ImageAdder addImage={self.addImage}></ImageAdder>
  </div>
  )
  }
}




export default TableTop;
