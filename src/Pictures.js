import React, { Component } from 'react';
import axios from 'axios';

import { headers } from './constants';

class Pictures extends Component {
  state = {
    pictures: [], // base64 images - string[]
  }
  componentDidMount() {
    axios.get('http://localhost:4000/photos',
      { headers },
    ).then(({ data })=> {
      console.log('data', data);
      // TODO: Find a better way to filter out these images - this is a quick fix as it is getting late 11:43pm
      const rawImages = data.filter(({ url }) => url.split(':').length > 1); // locating base64 by ":" and comparing the length to be greater athan 1
      this.setState((prev) => ({
        pictures: [...prev.pictures, ...rawImages].map(({ url }, i) => {
          return (
            <div
            key={i}
              style={{
                height: 400,
                width: '100vw',
                border: '1px solid black',
                background:"url("+ url +")",
              }}
            />
          ); 
        }),
      }))
    })
    .catch(err => console.error('error fetching the pictures: ', err))
  }

  render() {
    return (
      <div>
        Here will be your images
        {this.state.pictures.length && this.state.pictures}
      </div>
    );
  }
}

export default Pictures;
