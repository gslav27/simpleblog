import { DB } from '../constants';

export default (method, bodyData) => ({
  method,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-apikey': DB.KEY,
  },
  body: JSON.stringify(bodyData),
});
