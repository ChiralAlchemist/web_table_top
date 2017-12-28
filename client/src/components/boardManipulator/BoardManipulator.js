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
    var newRowNumber = e.target.value;
    this.setState({
      rows: newRowNumber
    })
    if(newRowNumber>0){
      this.props.boardManipulator('rows', newRowNumber)
    }
  }
  changeColumns (e) {
    var newColumnsNumber = e.target.value;
    this.setState({
      columns: newColumnsNumber
    })
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
export default BoardManipulator;
