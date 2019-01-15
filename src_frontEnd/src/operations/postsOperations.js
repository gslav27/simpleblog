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


export const fetchLatestPosts = () => (dispatch) => {
  dispatch(postsActions.waitResponse('1'));
  fetch(getFetchURL())
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((posts) => {
      dispatch(postsActions.loadFetchedPosts(getLatestPosts(posts)));
    })
    .catch((error) => {
      console.log('There has been a problem with fetching latest posts: ', error.message);
      dispatch(postsActions.waitResponse(1, false));
    });
};


export const fetchCurrentPostData = postId => (dispatch) => {
  dispatch(postsActions.waitResponse('2'));
  fetch(getFetchURL(undefined, postId))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      dispatch(postsActions.loadCurrentPostData(response));
      dispatch(loadCurrentPostComments(postId));
    })
    .catch((error) => {
      console.log('There has been a problem with fetching current post data: ', error.message);
      dispatch(postsActions.waitResponse(2, false));
    });
};


export const loadCurrentPostComments = postId => (dispatch) => {
  dispatch(postsActions.waitResponse('3'));
  fetch(getFetchURL(undefined, postId, true))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      dispatch(postsActions.loadCurrentPostComments(response.comments));
    })
    .catch((error) => {
      console.log('There has been a problem with fetching current post data: ', error.message);
      dispatch(postsActions.waitResponse(3, false));
    });
};


export const addComment = (body, author, postId) => (dispatch) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const newCommentData = {
    date: formattedDate,
    postId,
    author,
    body,
  };
  fetch(getFetchURL('comments'), getFetchObj('POST', newCommentData))
    .then((response) => {
      if (response.ok) {
        dispatch(loadCurrentPostComments(postId));
      }
    })
    .catch((error) => {
      console.log('There has been a problem with adding new comment: ', error.message);
      dispatch(postsActions.waitResponse(2, false));
    });
};
