import React from 'react';
import Cell from '../../components/cell/Cell'
import './board.css';

function Board(props) {
  var {tableData, handleDrag, handleDrop} = props
  return (
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
                          handleDrag ={handleDrag}
                          handleDrop ={handleDrop}
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
  )
}

  export default Board
