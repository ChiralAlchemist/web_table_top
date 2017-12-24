import React from 'react';
import Cell from '../../components/cell/Cell'
import Chat from '../../components/chat/Chat'
import './table_top.css';

//fake data
var green = {
  color : "green",
  number : 1
};
var blue = {
  color : "blue",
  number : 2,
  show: true
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
      tableData: startingTblData
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }
  handleDrag (startingPosition) {
    this.setState({
      startingPosition
    })
  }
  handleDrop(endingPosition){
    var {startingPosition, tableData} = this.state
    this.setState(
      {
        tableData: change(tableData, startingPosition, endingPosition)
      }
    )
    function change (matrix, start, end) {
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
  }
  render () {
    var self = this;
    var tableData = this.state.tableData
    return (
    <div>
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
                            id={key}
                            number={key}
                            show={cell.show}/>
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
  </div>
  )
  }
}




export default TableTop;
