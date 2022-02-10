import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://ben-reddit-project.herokuapp.com/api',
});

// Topic API calls
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

// Article API calls
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

// Comments API calls
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

export async function postComment(article_id, user, body) {
  try {
    console.log(user, body);
    const {
      data: { comment },
    } = await newsApi.post(`/articles/${article_id}/comments`, {
      username: user,
      body: body,
    });
    console.log(comment);
    return comment;
  } catch (err) {
    return err;
  }
}

// Vote API calls
export async function patchArticleVote(article_id, vote) {
  try {
    const {
      data: { article },
    } = await newsApi.patch(`/articles/${article_id}`, {
      inc_votes: vote,
    });
    return article;
  } catch (err) {
    return err;
  }
}
