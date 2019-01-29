// restDb
export const DB = {
  KEY: '5c4b933a8932456b8145567d',
  URL: 'https://simpleblog-dba0.restdb.io/rest',
  COLLECTIONS: {
    posts: 'posts',
    comments: 'comments',
  },
};



// Routes
export const routes = { posts: '/posts' };



// Form's
export const newPostFormInputs = {
  title: {
    element: 'input',
    placeholder: 'e.g. "AWESOME POST"',
    autoFocus: true,
    textUppercase: true,
  },
  description: {
    element: 'input',
    placeholder: 'e.g. "Look throught all options for..."',
  },
  author: {
    element: 'input',
    placeholder: 'e.g. "Stan Smith."',
  },
  body: {
    element: 'textarea',
    placeholder: 'e.g. "lorem ipsum..."',
    rows: 7,
  },
};

export const newPostCommentInputs = {
  text: {
    element: 'textarea',
    placeholder: 'your comment...',
    rows: 3,
  },
  author: {
    element: 'input',
    placeholder: 'your name...',
  },
};
