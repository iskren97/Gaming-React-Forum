import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const createUserHandle = (firstName, lastName, email, username, uid) => {
  return set(ref(db, `users/${username}`), {
    firstName,
    lastName,
    email,
    username,
    uid,
    createdOn: new Date(),
    likedPosts: {},
    role: 'user'
  });
};

export const getAllUsers = () => {
  return get(ref(db, 'users'));
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getUserByHandle = (username) => {
  return get(ref(db, `users/${username}`));
};

export const updateUserProfilePicture = (username, url) => {
  return update(ref(db), {
    [`users/${username}/avatarUrl`]: url
  });
};

export const updateUserCoverPicture = (username, url) => {
  return update(ref(db), {
    [`users/${username}/coverUrl`]: url
  });
};

export const updateUserRole = (username, role) => {
  return update(ref(db), {
    [`users/${username}/role`]: role
  });
};

export const updateDescription = (username, description) => {
  return update(ref(db), {
    [`users/${username}/userDescription`]: description
  });
};
