import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';

import './Register.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  }; //  form submit function which will invoke after successful validation

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

      <label>Email or username to be decided</label>
      <input {...register('age', { min: 18, max: 99 })} />

      {errors.age && (
        <p>You Must be older then 18 and younger then 99 years old</p>
      )}

      <input type="submit" />
    </form>
  );
};
export default Register;
