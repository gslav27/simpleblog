import { DB } from '../utilities/constants';

// Fetch object Selector
/* eslint-disable import/prefer-default-export */
export const getObj = (method, bodyData) => ({
  method,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-apikey': DB.KEY,
  },
  body: JSON.stringify(bodyData),
});
