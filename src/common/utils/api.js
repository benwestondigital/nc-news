import axios from 'axios';
const source = axios.CancelToken.source();
const cancelToken = source.token;

const newsApi = axios.create({
  baseURL: 'https://ben-reddit-project.herokuapp.com/api',
});

// Topic API calls
export async function getTopics() {
  try {
    const {
      data: { topics },
    } = await newsApi.get('/topics', {
      cancelToken,
    });
    return topics;
  } catch (err) {
    throw err;
  }
}

// Article API calls
export async function getArticleSort() {
  try {
    const {
      data: { articles },
    } = await newsApi.get('/articles', {
      cancelToken,
    });
    return Object.keys(articles[0]);
  } catch (err) {
    throw err;
  }
}

export async function getSingleArticle(article_id) {
  try {
    const {
      data: { article },
    } = await newsApi.get(`/articles/${article_id}`, {
      cancelToken,
    });
    return article;
  } catch (err) {
    throw err;
  }
}

export async function getArticles(queries) {
  try {
    const {
      data: { articles },
    } = await newsApi.get(
      '/articles',
      {
        params: queries,
      },
      {
        cancelToken,
      }
    );
    return articles;
  } catch (err) {
    throw err;
  }
}

// Comments API calls
export async function getCommentsByArticleId(article_id) {
  try {
    const {
      data: { comments },
    } = await newsApi.get(`/articles/${article_id}/comments`, {
      cancelToken,
    });
    return comments;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteComment(comment_id) {
  try {
    return await newsApi.delete(`/comments/${comment_id}`, { cancelToken });
  } catch (err) {
    throw err;
  }
}

export async function postComment(article_id, user, body) {
  try {
    const {
      data: { comment },
    } = await newsApi.post(
      `/articles/${article_id}/comments`,
      {
        username: user,
        body: body,
      },
      { cancelToken }
    );
    return comment;
  } catch (err) {
    throw err;
  }
}

// Vote API calls
export async function patchArticleVote(article_id, vote) {
  try {
    const {
      data: { article },
    } = await newsApi.patch(
      `/articles/${article_id}`,
      {
        inc_votes: vote,
      },
      { cancelToken }
    );
    return article;
  } catch (err) {
    throw err;
  }
}
