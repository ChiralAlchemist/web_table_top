import React from 'react';
import Cell from '../../components/cell/Cell'
import './board.css';

function Board(props) {
  var {tableData, handleDrag, handleDrop, images} = props
  var id_Image = {};
  images.forEach(function (image){
    id_Image[image._id] = image.image
  })
  return (
    <div className='board'>
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
                            background ={id_Image[cell.backgroundId]}
                            image={id_Image[cell._id]}
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
    </div>
  )
}

  export default Board
