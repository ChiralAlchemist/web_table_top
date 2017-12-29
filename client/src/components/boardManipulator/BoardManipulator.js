import React, {Component} from 'react';
class BoardManipulator extends Component {
  constructor(props) {
    super(props);
    this.state= {
      rows : 2,
      columns: 5
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
        <label>Rows:</label>
        <input type="number" onChange={(e)=>this.changeRows(e)} value={this.state.rows}></input>
        <label>Columns:</label>
        <input type="number" onChange={(e)=>this.changeColumns(e)}value={this.state.columns}></input>
      </div>
    )
  }
}

function limit (x, y) {
  return x > y ? y : x;
}
export default BoardManipulator;
