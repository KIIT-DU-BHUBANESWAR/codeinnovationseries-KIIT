/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({id,hasimg})=> {
  
  const image =  `${API}/question/img/${id}`
  return (
    <div className="" style={{maxHeight:"13em"}}>
            <img
              src={image}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
  );
}

export default ImageHelper;
