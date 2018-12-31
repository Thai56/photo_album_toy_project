import React, { Fragment } from 'react';

const Pictures = ({ pictures }) => {
  return (
    <Fragment>
      {pictures.length > 0 && pictures}
    </Fragment>
  );
}

export default Pictures;
