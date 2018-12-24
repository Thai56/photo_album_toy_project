/*
 *TODO: next step for self:
 *  [ ] make crud app
 *  [ ] docker compose to start up the node server, postgres db, and react app
 *  [ ] start testing the ui using jasmine or enzyme
 *  [ ] travis-ci or jenkins to start up running a ci process
 */

// Generel
import React, { Component } from 'react';
import './App.css';
import FileDrop from 'react-file-drop';

// Components
import Pictures from './components/Pictures';

// Utils
import {
  getPhotos,
  savePhotos,
  getBase64,
} from './utils/photosHelper';

// Constants
import { displayMessageTime } from './constants';

export const mapImageToBackground = ({ url }, i) => {
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
};

class App extends Component {
  //TODO: find a way to dynamically save file(s) rather than having it stuck to state - using state when maybe we don't need to
  state = {
    imageToSave: '',
    message: '',
    pictures: [],
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = () => {
    getPhotos().then(({ data }) => {
      // TODO: Find a better way to filter out these images - this is a quick fix as it is getting late 11:43pm
      const rawImages = data.filter(({ url }) => url.split(':').length > 1); // locating base64 by ":" and comparing the length to be greater athan 1

      this.setState((prev) => ({
        pictures: [...prev.pictures, ...rawImages].map(mapImageToBackground),
      }))
    })
    .catch(err => console.error('error fetching the pictures: ', err))
  }

  handleDrop = (files, e) => {
    let encoded = '';
    getBase64(files[0], (result) => {
      encoded = result;
      console.log('encoded ', encoded);
      this.setState(() => ({ imageToSave: encoded }))
    });
  }

  clearDisplayMessageAfterSetTime = () =>
    setTimeout(() => this.setState(() => ({ message: '' })), displayMessageTime);

  handleImageSaveSuccess = () => {
    console.log('SUCCESS')
    this.setState(() => ({
      imageToSave: '',
      message: 'Save was successful!',
    }),
      () => {
        this.clearDisplayMessageAfterSetTime();
        this.getPhotos();
      }
    );
  }

  handleImageSaveFailure = err => {
    this.setState(() => ({
      message: 'there was an issue saving the image before the catch',
    }),
      this.clearDisplayMessageAfterSetTime
    )

    console.error('there was a problem getting saving the image: ', err)
  }

  saveImage = () =>
    savePhotos(this.state.imageToSave)
      .then(
        this.handleImageSaveSuccess,
        err => console.error('there was an issue saving the image before the catch: ', err)
      )
      .catch(this.handleImageSaveFailure);

  render() {
    return (
      <div className="App">
        <Pictures pictures={this.state.pictures} />

        <div style={{ height: 100, width: '80vh', border: '1px solid white' }}>
          <FileDrop onDrop={this.handleDrop}>
            Drop File here
          </FileDrop>
        </div>

        { /*TODO: Make this a separate page*/
          this.state.imageToSave &&
          <div>
            <div
              style={{
                height: 400,
                width: '100vw',
                border: '1px solid black',
                background:"url("+ this.state.imageToSave +")",
              }}
            />
            <button onClick={this.saveImage}>Save</button>
          </div>
        }

        {this.state.message && <div>{this.state.message}</div>}
      </div>
    );
  }
}

export default App;
