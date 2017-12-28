import React from "react";
import axios from 'axios';
import w3 from './img_w3slogo.gif';
import './imageAdder.css';
class ImageAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [{
        image: w3
      }]
    };
  }
  _handleClick (e) {
    console.log('hangle click', this.state)
    var self = this;
    axios.get('/api/images')
    .then(function (response) {
      self.setState({
        images: [...response.data.images]
      })

    })
  }
  _handleDragStart (e, img){
    //e.preventDefault();
    this.props.addImage(img)
    console.log('e is this', e, img)
  }
  render () {
    const self = this;
    return (
      <div className='customImageContainer'>
        <h2>Custom Images</h2>
        <button onClick={(e)=>this._handleClick(e)}>Refresh</button>
        {

          this.state.images.map(function (image, idx) {
            return (
              <img
                className="newImage"
                draggable="true"
                alt="" 
                onDragStart={(e)=>self._handleDragStart(e, image)}
                src={image.image} />
            )
          })
        }
      </div>
    )
  }
}

export default ImageAdder;
