import React, {Component} from 'react';
import w3 from './img_w3slogo.gif'
class Cell extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
  }
  drop (e) {
    console.log('called drop', e)
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.currentTarget.appendChild(document.getElementById(data));
  }
  drag (e) {
    console.log('called drag', e.currentTarget.id)
    e.dataTransfer.setData('text', e.currentTarget.id); //e.target.id
  }
  allowDrop (e) {
    console.log('called allowDrop', e);
    e.preventDefault();
  }
  render () {
    var thing = this.props.show ?
      <img src={w3} draggable="true" onDragStart={(e) => this.drag(e)} id="drag1" alt='' />
      : 0;

    return (
      <div className='cell' onDrop={(e) => this.drop(e)} onDragOver={(e)=> this.allowDrop(e)}>
        {thing}
      </div>
    )
  }
}

export default Cell;
