import { oneOfType, number, string } from 'prop-types';


export const currentPostInterface = {
  title: string,
  author: string,
  date: string,
  body: string,
};

export const postInterface = {
  _id: string,      // 'id' is postId for Router and connection between PostComments & PostItems
  id: oneOfType([   // '_id' is item's RESTAPI database id (created by restdb);
    string,
    number,
  ]),
  title: string,
  author: string,
  date: string,
  description: string,
};

export const currentPostCommentInterface = {
  _id: string,
  body: string,
  author: string,
  date: string,
};
