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

      return post;
    });
};