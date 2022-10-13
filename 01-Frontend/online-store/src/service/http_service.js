import axios from 'axios';

const instance= ()=> axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers:{
    "Content-Type": "application/json"
  }
});

const http_service = {
    get:(path)=>instance().get(path)
  };
export default http_service;