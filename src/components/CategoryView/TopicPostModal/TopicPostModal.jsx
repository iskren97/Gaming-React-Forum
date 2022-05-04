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

function TopicPostModal({onClose}) {

  const { setContext } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const { userData: { username } } = useContext(AppContext);




  const createPost = () => {
    onClose();
    return addPost(title, content, username)
      

  };


  return (
  <div className="postModalContainer">
    <div  style={{
      display: 'flex',
      marginLeft: '20px',
      marginRight: '20px',
      width: 'auto',
      top: '-50px',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    
    <form className="post-form">
    <label>Title</label>

       <input maxLength="64" type="text" onChange={e => setTitle(e.target.value)}/>
   
      <label>Content</label>
      <textarea maxLength="8192" name="content" rows="5" style={{resize: "none"}} onChange={e => setContent(e.target.value)}></textarea>
  
      

      <Button onClick={()=>createPost()} variant="contained" style={{background: '#47DB00'}}>Post</Button>
    </form>
    </div>
    </div>
  );
}

export default TopicPostModal