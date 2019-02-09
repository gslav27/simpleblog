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
    required: true,
  },
  description: {
    element: 'input',
    placeholder: 'e.g. "Look throught all options for..."',
    required: true,
  },
  author: {
    element: 'input',
    placeholder: 'e.g. "Stan Smith."',
    required: true,
  },
  body: {
    element: 'textarea',
    placeholder: 'e.g. "lorem ipsum..."',
    rows: 5,
    required: true,
  },
};

export const newPostCommentInputs = {
  text: {
    element: 'textarea',
    placeholder: 'your comment...',
    rows: 3,
    autoFocus: true,
    required: true,
  },
  author: {
    element: 'input',
    placeholder: 'your name...',
    required: true,
  },
};
