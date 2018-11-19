import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileDrop from 'react-file-drop';
import base64 from 'base-64';

class App extends Component {
  //TODO: find a way to dynamically save file(s) rather than having it stuck to state - using state when maybe we don't need to
  state = { testImage: '' }
  handleDrop = (files, e) => {
    //const encoded = base64.encode(file);
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
        <div
          style={{
            height: 400,
            width: '100vw',
            border: '1px solid black',
            background:"url("+ this.state.testImage +")",
          }}
        />
      }
      </div>
    );
  }
}

export default App;
