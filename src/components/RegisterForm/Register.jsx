import React, { useContext } from 'react';
import './Register.css';

import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/auth.service';

import { getUserByHandle } from '../../services/users.service';
import { createUserHandle } from '../../services/users.service';

import AppContext from '../../providers/AppContext';
import { getUserData } from '../../services/users.service';
import swal from 'sweetalert';

const Register = ({ closeModal }) => {
  const { setContext } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const closeOnSubmit = () => {
    closeModal();
  };

  const onSubmit = (data) => {
    (async () => {
      try {
        const getUser = await getUserByHandle(data.username);

        if (getUser.exists()) {
          return swal(
            `User with username ${data.username} already exists!`,
            'Please use another username',
            'error'
          );
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
            userData: userData.val()[Object.keys(userData.val())[0]]
          });
        }

        closeOnSubmit();
        swal('Success', 'Your account was created!', 'success');
      } catch (err) {
        if (err.message.includes('auth/email-already-in-use')) {
          swal('Email already used!', 'Please use another email', 'error');
        }
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <input
        placeholder="First name"
        {...register('firstName', {
          required: true,
          minLength: 4,
          maxLength: 32,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      {errors?.firstName?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.firstName?.type === 'minLength' && (
        <p>First name cannot be less than 4 characters</p>
      )}

      {errors?.firstName?.type === 'maxLength' && <p>First name cannot exceed 32 characters</p>}
      {errors?.firstName?.type === 'pattern' && <p>Alphabetical characters only</p>}

      <input
        placeholder="Last name"
        {...register('lastName', {
          required: true,
          minLength: 4,
          maxLength: 32,
          pattern: /^[A-Za-z]+$/i
        })}
      />
      {errors?.lastName?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.lastName?.type === 'minLength' && <p>Last name cannot be less than 4 characters</p>}

      {errors?.lastName?.type === 'maxLength' && <p>Last name cannot exceed 32 characters</p>}
      {errors?.lastName?.type === 'pattern' && <p>Alphabetical characters only</p>}

      <input
        placeholder="Email"
        {...register('email', {
          minLength: 3,
          maxLength: 32,
          required: true
        })}
      />
      {errors?.email?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.email?.type === 'minLength' && <p>Email cannot be less than 3 characters</p>}
      {errors?.email?.type === 'maxLength' && <p>Email cannot exceed 320 characters</p>}

      <input
        placeholder="Username"
        {...register('username', {
          required: true,
          minLength: 3,
          maxLength: 18
        })}
      />
      {errors?.username?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.username?.type === 'minLength' && <p>Username cannot be less than 3 characters</p>}
      {errors?.username?.type === 'maxLength' && <p>Username cannot exceed 30 characters</p>}

      <input
        placeholder="Password"
        type="password"
        {...register('password', {
          required: true,
          minLength: 6,
          maxLength: 18
        })}
      />
      {errors?.password?.type === 'required' && <p>⚠ This field is required</p>}

      {errors?.password?.type === 'minLength' && <p>Password cannot be less than 6 characters </p>}

      {errors?.password?.type === 'maxLength' && <p>Password cannot exceed 20 characters </p>}

      <input type="submit" />
    </form>
  );
};
export default Register;
