import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://ben-reddit-project.herokuapp.com/api'
  });

  export async function getTopics() {
      const topics = (await newsApi.get('/topics')).data.topics;
      return topics;
  }

  export async function getArticleSort() {
      const article = (await newsApi.get('/articles')).data.articles;
      return Object.keys(article[0]);
  }