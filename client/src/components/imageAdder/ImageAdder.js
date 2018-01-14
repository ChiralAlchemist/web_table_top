import React from "react";
import './imageAdder.css';

// function ImageAdder(props) {
class ImageAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: null
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
          <input
            type='radio'
            value='background'
            checked={radioValue==='background'}
            onChange={(e)=>this.radioChange(e)}>
          </input>
          <label>Background</label>
          <input
            type='radio'
            value="figure"
            checked={radioValue==='figure'}
            onChange={(e)=>this.radioChange(e)}></input>
          <label>Figure</label>
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
