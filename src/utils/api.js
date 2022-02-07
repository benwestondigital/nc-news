import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://ben-reddit-project.herokuapp.com/api'
  });

  export async function getTopics() {
      const topics = (await newsApi.get('/topics')).data.topics;
      return topics;
  }