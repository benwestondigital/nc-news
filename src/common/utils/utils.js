export const stringFormat = item => {
  const itemWords = item.split('_');
  const capCaseWords = itemWords.map(str => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  });
  return capCaseWords.join(' ');
};

export const dateTimeFormat = created_at => {
  const format = new Date(created_at);

  const date = `${format.getDate()}/${format.getMonth() + 1}/${format
    .getFullYear()
    .toString()
    .slice(-2)}`;

  const addZero = timeUnit => {
    if (timeUnit < 10) {
      timeUnit = '0' + timeUnit;
    }
    return timeUnit;
  };

  const hours = addZero(format.getHours());
  const minutes = addZero(format.getMinutes());

  const time = `${hours}:${minutes}`;

  return { date, time };
};

export const userDataMath = (userData) => {
  const articlesPosted = userData.length;
  const commentCount = userData.reduce((acc, obj) => {
    return acc + Number(obj.comment_count);
  }, 0);
  const voteCount = userData.reduce((acc, obj) => {
    return acc + obj.votes;
  }, 0);
  return { articlesPosted, commentCount, voteCount };
}