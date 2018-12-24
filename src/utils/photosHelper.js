import axios from 'axios';
import {
  baseUrl,
  headers,
  errorMessage,
} from '../constants'; 

export const savePhotos = (url) => { // url is the string to save

  console.log('saving ', url)
  return axios.post( baseUrl, { url }, { headers });
};

export const getPhotos = () => axios.get(baseUrl, { headers }); 
