import React from "react"
import axios from 'axios';
class ImageAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }
  _handleClick (e) {
    console.log('hangle click', this.state)
    var self = this;
    var {images} = this.state
    axios.get('/api/images')
    .then(function (response) {
      self.setState({
        images: [...response.data.images]
      })

    })
  }
  render () {

    return (
      <div>
        <button onClick={(e)=>this._handleClick(e)}>Refresh</button>
        {
          this.state.images.map(function (image, idx) {
            return (
              <img src={image.image} />
            )
          })
        }
      </div>
    )
  }
}

export default ImageAdder;
