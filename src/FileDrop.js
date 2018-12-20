import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { headers } from './constants';

class FileDrop extends Component {
  //TODO: find a way to dynamically save file(s) rather than having it stuck to state - using state when maybe we don't need to
  state = {
    testImage: '',
    message: '',
  }

  handleDrop = (files, e) => {
    let encoded = '';
    console.log('files ', files[0]);
    this.getBase64(files[0], (result) => {
      encoded = result;
      console.log('encoded ', encoded);
      this.setState(() => ({ testImage: encoded }))
    });
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  saveImage = () => {
    console.log('saving test image')
    axios.post('http://localhost:4000/photos',
      {
        //TODO: Try without the cors extension to see if we can fix this
        url: this.state.testImage,
      },
      { headers }
    ).then((res) => {
      console.log('here is your response ', res)
      this.setState(() => ({
        testImage: '',
        message: 'Save was successful!',
      }),
        () => setTimeout(() => this.setState(() => ({ message: '' })), 3000)
      );
    },
      err => console.error('there was an issue saving the image before the catch: ', err)
    )
      .catch(err => {
        this.setState(
          () => ({ message: 'there was an issue saving the image before the catch' }),
          setTimeout(() => this.setState(() => ({ message: '' })), 3000)
        )
        console.error('there was a problem getting saving the image: ', err)
      });
  }

  render() {
    return (

      <div className="App">
        <div style={{ height: 100, width: '80vh', border: '1px solid white' }}>
          <FileDrop onDrop={this.handleDrop}>
            Drop File here
           </FileDrop>
        </div>
        {
          this.state.testImage &&
          <div>
            <div
              style={{
                height: 400,
                width: '100vw',
                border: '1px solid black',
                background:"url("+ this.state.testImage +")",
              }}
            />
            <button onClick={this.saveImage}>Save</button>
          </div>
        }

        {this.state.message &&
            <div>{this.state.message}</div>}
      </div>
    );
  }
}

export default FileDrop;
