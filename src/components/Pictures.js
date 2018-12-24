import React from 'react';

const Pictures = ({ pictures }) => {
  return (
    <div>
      Here will be your images
      {pictures.length > 0 && pictures}
    </div>
  );
}

export default Pictures;
