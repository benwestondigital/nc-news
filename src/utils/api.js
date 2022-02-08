import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://ben-reddit-project.herokuapp.com/api',
});

export async function getTopics() {
  const topics = (await newsApi.get('/topics')).data.topics;
  return topics;
}

export async function getArticleSort() {
  const article = (await newsApi.get('/articles')).data.articles;
  return Object.keys(article[0]);
}

export async function getSingleArticle(article_id) {
  const article = (await newsApi.get(`/articles/${article_id}`)).data.article;
  return article;
}

export async function getArticles(topic) {
  const articles = (
    await newsApi.get('/articles', {
      params: {
        topic: topic,
      },
    })
  ).data.articles;
  return articles;
}

