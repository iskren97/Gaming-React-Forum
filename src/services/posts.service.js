import { ref, push, get, query, equalTo, orderByChild, update, onValue } from 'firebase/database';
import { db } from '../config/firebase-config';




export const addPost = (title, content, handle, category) => {

  return push(
    ref(db, 'posts'),
    {
      title,
      content,
      author: handle,
      createdOn: Date.now(),
      category: category,
      likes: 0,
      dislikes: 0,
    },
  )
    .then(result => {

      return getPostById(result.key);
    });
};



export const getPostById = (id) => {

  return get(ref(db, `posts/${id}`))
    .then(result => {
      if (!result.exists()) {
        throw new Error(`Post with id ${id} does not exist!`);
      }

      const post = result.val();
      post.id = id;
      post.createdOn = new Date(post.createdOn);
      if (!post.likedBy) {
        post.likedBy = [];
      } else {
        post.likedBy = Object.keys(post.likedBy);
      }

      if (!post.dislikedBy) {
        post.dislikedBy = [];
      } else {
        post.dislikedBy = Object.keys(post.dislikedBy);
      }

      return post;
    });
};


export const fromPostsDocument = snapshot => {
  const postsDocument = snapshot.val();

  return Object.keys(postsDocument).map(key => {
    const post = postsDocument[key];

    return {
      ...post,
      id: key,
      createdOn: new Date(post.createdOn),
      likedBy: post.likedBy ? Object.keys(post.likedBy) : [],
    };
  });
};


export const getAllPosts = () => {

  return get(ref(db, 'posts'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return [];
      }

      return fromPostsDocument(snapshot);
    });
};