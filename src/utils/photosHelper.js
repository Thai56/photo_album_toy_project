import axios from 'axios'; import {
  baseUrl,
  headers,
} from '../constants';

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export const savePhotos = (url) => { // url is the string to save
  return axios.post( baseUrl, { url }, { headers });
};

export const getPhotos = () => axios.get(baseUrl, { headers });

export const deletePhotoById = id => {
  return axios.delete(`${baseUrl}/${id}`, { headers });
}
