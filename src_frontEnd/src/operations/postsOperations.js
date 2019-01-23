import * as postsActions from '../actions/postsActions';


const getFetchObj = (method, bodyData) => {
  const obj = {
    method,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(bodyData),
  };
  return obj;
};


const getFetchURL = (type = 'posts', postId = '', comments = false) => {
  const apiURL = 'http://localhost:3001';
  // const apiURL = 'https://my-json-server.typicode.com/gslav27/fakeJsonServer/';
  const collectionUrl = type;
  return `${apiURL}/${collectionUrl}${postId ? `/${postId}${comments ? '?_embed=comments' : ''}` : ''}`;
};


const getTransformedDate = date => date.split('/')
  .reduceRight(((acc, dateType, i) => {
    const correctDate = dateType.padStart(2, '0');
    return (i == 1)
      ? [acc, correctDate]
      : Number(`${acc[0]}${correctDate}${acc[1]}`);
  }));


const getLatestPosts = posts => posts
  .map(post => ({
    ...post,
    dateNum: getTransformedDate(post.date),
  }))
  .sort((a, b) => b.dateNum - a.dateNum)
  .slice(0, 10);


export const fetchLatestPosts = () => async (dispatch) => {
  dispatch(postsActions.waitResponse('1'));
  try {
    const result = await fetch(getFetchURL());
    const resultJSON = await result.json();
    dispatch(postsActions.loadFetchedPosts(getLatestPosts(resultJSON)));
  } catch (err) {
    console.log('There has been a problem with fetching latest posts: ', err.message);
    dispatch(postsActions.waitResponse(1, false));
  }
};


export const fetchCurrentPostData = postId => async (dispatch) => {
  dispatch(postsActions.waitResponse('2'));
  try {
    const result = await fetch(getFetchURL(undefined, postId));
    const resultJSON = await result.json();
    dispatch(postsActions.loadCurrentPostData(resultJSON));
    dispatch(loadCurrentPostComments(postId));
  } catch (err) {
    console.log('There has been a problem with fetching current post data: ', err.message);
    dispatch(postsActions.waitResponse(2, false));
  }
};


export const loadCurrentPostComments = postId => async (dispatch) => {
  dispatch(postsActions.waitResponse('3'));
  try {
    const result = await fetch(getFetchURL(undefined, postId, true));
    const resultJSON = await result.json();
    dispatch(postsActions.loadCurrentPostComments(resultJSON.comments));
  } catch (err) {
    console.log('There has been a problem with fetching current post data: ', err.message);
    dispatch(postsActions.waitResponse(3, false));
  }
};


export const addComment = (body, author, postId) => async (dispatch) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const newCommentData = {
    date: formattedDate,
    postId,
    author,
    body,
  };
  try {
    const result = await fetch(getFetchURL('comments'), getFetchObj('POST', newCommentData));
    const resultJSON = await result.json();
    console.log('response OK', resultJSON);
    dispatch(loadCurrentPostComments(postId));
  } catch (err) {
    console.log('There has been a problem with adding new comment: ', err.message);
    dispatch(postsActions.waitResponse(2, false));
  }
};
