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
      dislikedBy: post.dislikedBy ? Object.keys(post.dislikedBy) : [],
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



export const likePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const removeLikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};

export const dislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/dislikedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/dislikedPosts/${postId}`] = true;

  return update(ref(db), updateLikes);
};

export const removeDislikePost = (handle, postId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/dislikedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/dislikedPosts/${postId}`] = null;

  return update(ref(db), updateLikes);
};