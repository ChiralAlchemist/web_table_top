import React, {Component} from 'react';
class Cell extends Component {
  constructor(props) {
    super(props);

    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
  }
  drag (e) {
    var startingPosition = this.props.position
    this.props.handleDrag(startingPosition)
  }
  drop (e) {
    e.preventDefault();
    var endingPosition = this.props.position
    this.props.handleDrop(endingPosition);
  }
  allowDrop (e) {
    e.preventDefault();
  }
  render () {

    var background = this.props.background ? {
      "backgroundImage": `url(${this.props.background})`,
      "backgroundSize": 'cover'
    } : {}
    console.log('background is' , background)
    var cellContent = this.props.image ?
      <img src={this.props.image}
        className="cellImage"
        draggable="true"
        onDragStart={(e) => this.drag(e)}
        alt=''
      />
      : <div draggable="true"
        onDragStart={(e) => this.drag(e)}
        id={this.props.number}
        alt=''>

      </div>;

    return (
      <div
        className='cell'
        style={background}
        onDrop={(e) => this.drop(e)}
        onDragOver={(e)=> this.allowDrop(e)}>
        {cellContent}

      </div>
    )
  }
}

export default Cell;
