import React from 'react';
import Cell from '../../components/cell/Cell'
import './table_top.css';
const TableTop = ({tableData}) => (
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
                   return (
                     <td key={key}>
                       <Cell  id={key} number={key} show={cell.show}/>
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

export default TableTop;
