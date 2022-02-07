import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://ben-reddit-project.herokuapp.com/api'
  });