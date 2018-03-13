import React from "react";
import { Button } from 'semantic-ui-react';
import './imageAdder.css';

// function ImageAdder(props) {
class ImageAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'figure'
    };
  }
  radioChange (e) {
    console.log('radio change e', e.target.value)
    this.setState({
      radioValue: e.target.value
    })
  }
  render () {
    var {images, addImage, imageLoad} = this.props;
    var { radioChange, radioValue } = this.state;
    return (
      <div className='customImageContainer'>
        <h2>Custom Images</h2>
        <button onClick={(e)=>imageLoad(e)}>Refresh</button>
        <div>
          <Button.Group>
          <Button
            value='background'
            onClick={(e)=>this.radioChange(e)}>Background</Button>
          <Button.Or />
          <Button
            value="figure"
            onClick={(e)=>this.radioChange(e)}
            >Figure</Button>
          </Button.Group>
          
        </div>
        {
          images.map(function (image, idx) {
            return (
              <img
                className="newImage"
                draggable="true"
                alt=""
                key={image._id}
                onDragStart={(e)=>addImage(image, radioValue)}
                src={image.image} />
              )
            })
          }
        </div>
      )
  }
}

export default ImageAdder;
