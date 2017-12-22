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
var tableData = [[green, green, green, green, blue],
                  [green, green, green, green, green]
                ];
const TableTop = () => (
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
   <Chat></Chat>
  </div>
)
//
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

export default TableTop;
