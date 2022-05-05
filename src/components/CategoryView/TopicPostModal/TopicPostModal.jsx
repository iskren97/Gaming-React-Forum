import React from 'react'
import { useState, useContext} from 'react'

import { useForm } from 'react-hook-form';

import { getUserByHandle } from '../../../services/users.service';
import { createUserHandle } from '../../../services/users.service';

import AppContext from '../../../providers/AppContext';
import { getUserData } from '../../../services/users.service';


import Button from '@mui/material/Button';

import './TopicPostModal.css';

import { addPost, getPostById } from '../../../services/posts.service';

import swal from 'sweetalert';

function TopicPostModal({onClose, category}) {

  const { setContext } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const { userData: { username } } = useContext(AppContext);


const handleValidation = (title, content) =>{
  if(title === '' || title.length < 16 || title.length > 64){
    swal(
      'Something went wrong...',
      'Post title must be between 16 and 64 characters long!',
      'error'
    );
    return false
  }
  if(content === '' || content.length < 32 || content.length > 8192){
    swal(
      'Something went wrong...',
      'Post content must be between 32 and 8192 characters long!',
      'error'
    );
    return false
  }

  return true;
}

  const createPost = () => {
    if(handleValidation(title, content)){
      onClose();
      swal('Good job!', 'Post uploaded successfully!', 'success');
      return addPost(title, content, username, category)
    } 

  };


  return (
  <div className="postModalContainer">
    <div  style={{
      display: 'flex',
      marginLeft: '1em',
      marginRight: '1em',
      width: '100%',
      top: '-50px',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    
    <form className="post-form">
    <h3>Title</h3>

       <input maxLength="64" type="text" onChange={e => setTitle(e.target.value)}/>
   
      <h3>Content</h3>
      <textarea maxLength="8192" name="content" rows="5" style={{resize: "none"}} onChange={e => setContent(e.target.value)}></textarea>
  
      

      <Button onClick={()=>createPost()} variant="contained" style={{background: '#47DB00'}}>Post</Button>
    </form>
    </div>
    </div>
  );
}

export default TopicPostModal