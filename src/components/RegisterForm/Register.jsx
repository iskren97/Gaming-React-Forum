import React, { useContext } from 'react';
import './Register.css';

import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/auth.service';

import { getUserByHandle } from '../../services/users.service';
import { createUserHandle } from '../../services/users.service';

import AppContext from '../../providers/AppContext';
import { getUserData } from '../../services/users.service';

const Register = ({ closeModal }) => {
  const { setContext } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const closeOnSubmit = () => {
    closeModal();
  };

  const onSubmit = (data) => {
    (async () => {
      try {
        const getUser = await getUserByHandle(data.username);

        if (getUser.exists()) {
          return alert(`User with username ${data.username} already exists!`);
        }

        const credential = await registerUser(data.email, data.password);

        createUserHandle(
          data.firstName,
          data.lastName,
          data.email,
          data.username,
          credential.user.uid
        );

        const userData = await getUserData(credential.user.uid);
        if (userData.exists()) {
          setContext({
            user: data.email,
            userData: userData.val()[Object.keys(userData.val())[0]],
          });
        }

        closeOnSubmit();
      } catch (err) {
        if (err.message.includes('auth/email-already-in-use')) {
          alert('Email already used!');
        }
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <label>First Name</label>
      <input
        {...register('firstName', {
          required: true,
          minLength: 4,
          maxLength: 32,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors?.firstName?.type === 'required' && (
        <p>⚠ This field is required</p>
      )}

      {errors?.firstName?.type === 'minLength' && (
        <p>First name cannot be less than 4 characters</p>
      )}

      {errors?.firstName?.type === 'maxLength' && (
        <p>First name cannot exceed 32 characters</p>
      )}
      {errors?.firstName?.type === 'pattern' && (
        <p>Alphabetical characters only</p>
      )}

      <label>Last Name</label>
      <input
        {...register('lastName', {
          required: true,
          minLength: 4,
          maxLength: 32,
          pattern: /^[A-Za-z]+$/i,
        })}
      />
      {errors?.lastName?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.lastName?.type === 'minLength' && (
        <p>Last name cannot be less than 4 characters</p>
      )}

      {errors?.lastName?.type === 'maxLength' && (
        <p>Last name cannot exceed 32 characters</p>
      )}
      {errors?.lastName?.type === 'pattern' && (
        <p>Alphabetical characters only</p>
      )}

      <label>Email</label>
      <input
        {...register('email', {
          minLength: 3,
          maxLength: 320,
          required: true,
        })}
      />
      {errors?.email?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.email?.type === 'minLength' && (
        <p>Email cannot be less than 3 characters</p>
      )}
      {errors?.email?.type === 'maxLength' && (
        <p>Email cannot exceed 320 characters</p>
      )}

      <label>Username</label>
      <input
        {...register('username', {
          required: true,
          minLength: 3,
          maxLength: 30,
        })}
      />
      {errors?.username?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.username?.type === 'minLength' && (
        <p>Username cannot be less than 3 characters</p>
      )}
      {errors?.username?.type === 'maxLength' && (
        <p>Username cannot exceed 30 characters</p>
      )}

      <label>Password</label>
      <input
        type="password"
        {...register('password', {
          required: true,
          minLength: 6,
          maxLength: 20,
        })}
      />
      {errors?.password?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.password?.type === 'minLength' && (
        <p>Password cannot be less than 6 characters </p>
      )}

      {errors?.password?.type === 'maxLength' && (
        <p>Password cannot exceed 20 characters </p>
      )}

      <input type="submit" />
    </form>
  );
};
export default Register;
