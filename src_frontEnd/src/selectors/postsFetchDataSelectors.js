import { restDb } from '../constants';


// Fetch object Selector
export const getObj = (method, bodyData) => ({
  method,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-apikey': restDb.KEY,
  },
  body: JSON.stringify(bodyData),
});



// URL Selectors
export const getURL = (collection, postId = '') => {
  const collectionUrl = `${restDb.COLLECTIONS[collection]}${collection === 'posts'
    ? `${postId ? `?q={"id": ${Number(postId) || `"${postId}"`}}` : ''}`
    : `${postId ? `?q={"postId": ${Number(postId) || `"${postId}"`}}` : ''}`
  }`;
  return `${restDb.URL}/${collectionUrl}`;
};


export const getURLDeleteItem = (collection, id = '') => {
  const collectionUrl = `${restDb.COLLECTIONS[collection]}/${id}`;
  return `${restDb.URL}/${collectionUrl}`;
};


export const getURLAddPost = (collection) => {
  const collectionUrl = `${restDb.COLLECTIONS[collection]}`;
  return `${restDb.URL}/${collectionUrl}`;
};
