import React, {Component} from 'react';
class BoardManipulator extends Component {
  constructor(props) {
    super(props);
    var {row, column} = this.props
    this.state= {
      rows : row,
      columns: column
    }
  }
  changeRows (e) {
    var newRowNumber = limit(e.target.value,50);
    if(!newRowNumber){
      this.setState({
        rows: newRowNumber
      })
      return
    }
    if(newRowNumber==="0") {
      newRowNumber = 1
    }
    this.setState({
      rows: newRowNumber
    })
    this.props.boardManipulator('rows', newRowNumber)
  }
  changeColumns (e) {
    var newColumnsNumber = limit(e.target.value,50);

    this.setState({
      columns: newColumnsNumber
    })
    this.props.boardManipulator('columns', newColumnsNumber)
  }
  render () {
    return (
      <div>
        <h2>Alter the size of the Board</h2>
        <label>Rows:</label>
        <input type="number" onChange={(e)=>this.changeRows(e)} value={this.props.row}></input>
        <label>Columns:</label>
        <input type="number" onChange={(e)=>this.changeColumns(e)} value={this.props.column}></input>
      </div>
    )
  }
}

function limit (x, y) {
  return x > y ? y : x;
}
export default BoardManipulator;
