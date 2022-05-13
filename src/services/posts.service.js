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

export const getCommentById = (postId, commentId) =>{
   return get(ref(db, `posts/${postId}/comments/${commentId}`)).then(result =>{

    const comment = result.val();
    comment.id = postId;
    comment.createdOn = new Date(comment.createdOn);

    if (!comment.likedBy) {
      comment.likedBy = [];
    } else {
      comment.likedBy = Object.keys(comment.likedBy);
    }

    if (!comment.dislikedBy) {
      comment.dislikedBy = [];
    } else {
      comment.dislikedBy = Object.keys(comment.dislikedBy);
    }


    return comment
    })
}

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

      if (!post.comments) {
        post.comments = [];
      } else {
        post.comments = Object.keys(post.comments);
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
      comments: post.comments ? Object.keys(post.comments) : [],
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


export const deletePost = async (id) => {
  const post = await getPostById(id);
  const updateLikes = {};
  const updateDislikes = {}

  post.likedBy.forEach(handle => {
    updateLikes[`/users/${handle}/likedPosts/${id}`] = null;
  });

  post.dislikedBy.forEach(handle => {
    updateLikes[`/users/${handle}/dislikedPosts/${id}`] = null;
  });

  await update(ref(db), updateLikes);
  await update(ref(db), updateDislikes);

  return update(ref(db), {
    [`/posts/${id}`]: null,
  });
};



export const editPostTitle = (id, postTitle) =>{
  return update(ref(db, `posts/${id}`), {
    title: postTitle,
  });
}

export const editPostContent = (id, postContent) =>
{
  return update(ref(db, `posts/${id}`), {
    content: postContent,
  });
}


export const commentPost = (id, content, author) =>{
    //generate a string of 18 random characters
    const replyId = Math.random().toString(36).substring(2, 18);


   update(ref(db, `posts/${id}/comments/${replyId}`),{
      content: content,
      author: author,
      createdOn: Date.now(),
   })

   update(ref(db, `users/${author}/commentsonposts/${id}/${replyId}`),{
      content: content,
      createdOn: Date.now(),
   })
}


export const likeComment = (handle, postId, commentId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/comments/${commentId}/likedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/likedComments/${commentId}`] = true;

  return update(ref(db), updateLikes);
};

export const removeLikeComment = (handle, postId, commentId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/comments/${commentId}/likedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/likedComments/${commentId}`] = null;

  return update(ref(db), updateLikes);
};

export const dislikeComment = (handle, postId, commentId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/comments/${commentId}/dislikedBy/${handle}`] = true;
  updateLikes[`/users/${handle}/dislikedComments/${commentId}`] = true;

  return update(ref(db), updateLikes);
};

export const removeDislikeComment = (handle, postId, commentId) => {
  const updateLikes = {};
  updateLikes[`/posts/${postId}/comments/${commentId}/dislikedBy/${handle}`] = null;
  updateLikes[`/users/${handle}/dislikedComments/${commentId}`] = null;

  return update(ref(db), updateLikes);
};

export const deleteComment = async ( postId, commentId) => {
  const comment = await getCommentById(postId, commentId);
  const updateLikes = {};
  const updateDislikes = {}
  

  comment.likedBy.forEach(handle => {
    updateLikes[`/users/${handle}/likedComments/${commentId}`] = null;
  });

  comment.dislikedBy.forEach(handle => {
    updateLikes[`/users/${handle}/dislikedComments/${commentId}`] = null;
  });

  


  await update(ref(db), {[`users/${comment.author}/commentsonposts/${postId}/${commentId}`]: null});

  await update(ref(db), updateLikes);
  await update(ref(db), updateDislikes);
 

  return update(ref(db), {
    [`/posts/${postId}/comments/${commentId}`]: null,
  });
};


export const editCommentContent = async(postId, commentId, commentContent) =>
{ 
  const comment = await getCommentById(postId, commentId);

  await update(ref(db, `users/${comment.author}/commentsonposts/${postId}/${commentId}`), {
    content: commentContent,
  });

  return update(ref(db, `posts/${postId}/comments/${commentId}`), {
    content: commentContent,
  });
}

export const getCommentsFromUser = (handle) =>{
  return get(ref(db, `users/${handle}/commentsonposts`))
}


