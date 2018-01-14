import React from "react";
import './imageAdder.css';

function ImageAdder(props) {
  var {images, addImage, imageLoad} = props
  return (
    <div className='customImageContainer'>
      <h2>Custom Images</h2>
      <button onClick={(e)=>imageLoad(e)}>Refresh</button>
      {
        images.map(function (image, idx) {
          return (
            <img
              className="newImage"
              draggable="true"
              alt=""
              key={image._id}
              onDragStart={(e)=>addImage(image)}
              src={image.image} />
          )
        })
      }
    </div>
  )
}

export default ImageAdder;
