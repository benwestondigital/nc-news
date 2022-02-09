import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://ben-reddit-project.herokuapp.com/api',
});

export async function getTopics() {
  try {
    const {
      data: { topics },
    } = await newsApi.get('/topics');
    return topics;
  } catch (err) {
    return err;
  }
}

export async function getArticleSort() {
  try {
    const {
      data: { articles },
    } = await newsApi.get('/articles');
    return Object.keys(articles[0]);
  } catch (err) {
    return err;
  }
}

export async function getSingleArticle(article_id) {
  try {
    const {
      data: { article },
    } = await newsApi.get(`/articles/${article_id}`);
    return article;
  } catch (err) {
    return err;
  }
}

export async function getArticles(queries) {
  try {
    const {
      data: { articles },
    } = await newsApi.get('/articles', {
      params: queries,
    });
    return articles;
  } catch (err) {
    return err;
  }
}

export async function getCommentsByArticleId(article_id) {
  try {
    const {
      data: { comments },
    } = await newsApi.get(`/articles/${article_id}/comments`);
    return comments;
  } catch (err) {
    return err;
  }
}
