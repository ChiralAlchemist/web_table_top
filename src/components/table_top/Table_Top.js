import React from 'react';
import Cell from '../../components/cell/Cell'
import './table_top.css';
const TableTop = ({tableData}) => (
  <div>
   <table>
     {
      tableData.map(function (row) {
       return (
         <tr>
          {
            row.map(function (cell) {
              return (
                <td>
                  <Cell number={cell.number} show={cell.show}/>
                </td>
              )
            })
          }
         </tr>
       )
      })
    }
   </table>
  </div>
)

export default TableTop;
