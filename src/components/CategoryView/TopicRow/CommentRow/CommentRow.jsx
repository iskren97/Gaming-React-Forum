import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import './CommentRow.css'

import { useState, useEffect, useContext } from 'react'
import AppContext from '../../../../providers/AppContext';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import Avatar from '@mui/material/Avatar';
import avatar from '../../../../assets/avatar.jpg';

import { useNavigate } from 'react-router-dom';

import {
  getCommentById,
  likeComment,
  removeLikeComment,
  dislikeComment,
  removeDislikeComment,
  deleteComment,
  editCommentContent,
  
} from '../../../../services/posts.service';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

import {getUserByHandle } from '../../../../services/users.service'
import swal from 'sweetalert';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'lightgray',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.primary,
  marginTop: "1rem",
}));


function CommentRow({postId, commentId}) {
  const [commentInfo, setCommentInfo] = useState("")
  const [userInfo, setUserInfo] = useState("")

  const { user, userData, setContext } = useContext(AppContext);
  const [userRating, setUserRating] = useState(0)
  const [commentContent, setCommentContent] = useState("")
  const navigate = useNavigate();

  useEffect(()=>{
    getCommentById(postId, commentId).then(comment => {
      setCommentInfo(comment)
    }
    )
    
  }, [commentId, postId])

  useEffect(()=>{
    getUserByHandle(commentInfo.author).then(res=>{
      setUserInfo(res.val())
      setUserRating((commentInfo.likedBy?.length || 0) - (commentInfo.dislikedBy?.length || 0))
      setCommentContent(commentInfo.content)
    }
  )

  }, [commentInfo.author, commentInfo.content])



  // console.log(commentInfo)

  const isCommentLiked = () => commentInfo?.likedBy?.includes(userData?.username)

  const isCommentDisliked = () => commentInfo?.dislikedBy?.includes(userData?.username);

  const handleLike = () => {
    if(isCommentLiked()){
      removeLikeComment(userData?.username, postId, commentId)
        setUserRating(userRating -1)
    }else{
      if(isCommentDisliked()){
        removeDislikeComment(userData?.username, postId, commentId);
        likeComment(userData?.username, postId, commentId);      
        setUserRating(userRating +2)
      }else{
        likeComment(userData?.username, postId, commentId);      
        setUserRating(userRating +1)

      }
    } 
  }

  const handleDislike = () =>{
    if(isCommentDisliked()){
      removeDislikeComment(userData?.username, postId, commentId);
      setUserRating(userRating +1)
    }else{
      if(isCommentLiked()){
        removeLikeComment(userData?.username, postId, commentId);
        dislikeComment(userData?.username, postId, commentId);
        setUserRating(userRating -2)
      }else{
        dislikeComment(userData?.username, postId, commentId);
        setUserRating(userRating -1)
      }
    }
  }


  const handleDeleteComment = () => {
    swal({
      className: "swal-red",
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteComment(postId, commentId);
        swal('Post deleted!', {
          className: "swal-green",
          icon: 'success',
        });
      } else {
        swal('Your post is safe!', {
          className: "swal-green",
          icon: 'success',
        });
      }
    });

  };



  const handleEditContent = () =>{
    swal({
      title: 'Edit Content',
      Text: 'Edit this posts content',
    
 
      content: {
        element: 'input',
        attributes: {
          placeholder: 'content',
          type: 'text',
          value: commentInfo.content,
        },
      },
    }).then((content) => {
      if (content) {
        setCommentContent(content)
        if (content === '' || content.length < 32 || content.length > 8192) {
          swal(
            'Something went wrong...',
            'Post content must be between 32 and 8192 characters long!',
            'error'
          );
          return false;
        } else {
          editCommentContent(postId, commentId, content);
          swal('Post content edited!', {
            icon: 'success',
          });
        }

         
      } else {
        swal('No changes were made to your post!', {
          icon: 'warning',
        });
      }
    });
  }
 

  const iconsField = () => {
    if (!user) {
      return null;
    } else if (userData.username === commentInfo.author) {
      return (
        <div className="iconsContainer">
          <Tooltip title="Edit this post's title" placement="right-end">
            <EditIcon onClick={() => handleEditContent()} className="editIcon" />
          </Tooltip>

                   
          <Tooltip title="Delete this post" placement="right-end">
            <DeleteForeverIcon
              onClick={() => handleDeleteComment()}
              className="deleteIcon"
            />
          </Tooltip>
        </div>
      );
    } else {
      return <div className="iconsContainer"></div>
    }
  };



  const ratingButtons = () => {
    const loggedView = (
      <div className="rating-buttons">
        <ThumbDownAltIcon
          className={isCommentDisliked() ? 'thumbDownIconFilled' : 'thumbDownIcon'}
          onClick={() => handleDislike()}
        />
        {userRating}
        <ThumbUpAltIcon
          className={isCommentLiked() ? 'thumbUpIconFilled' : 'thumbUpIcon'}
          onClick={() => handleLike()}
        />
      </div>
    );

    const defaultView =
      (commentInfo.likedBy?.length || 0) - (commentInfo.dislikedBy?.length || 0);

    return !user || userData?.username === commentInfo.author
      ? defaultView
      : loggedView;
  };


  const dateFormatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };
  const dateFormatHour = (date) => {
    let d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return [hours, minutes].join(':');
  };



  return (
    <>
    <div className="commentRowContainer">

    <Item>

    <Grid container direction="row" sx={{marginTop: "10px", gap: '1.5rem', flexWrap: 'nowrap', justifyContent: 'flex-end'}} >
    <Grid item xs={9}  style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
          {commentContent} 
          </Grid>
          <Grid
                item
                xs={2}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <div>Date</div>

                <div>{dateFormatDate(commentInfo.createdOn)}</div>
                <div>{dateFormatHour(commentInfo.createdOn)}</div>
              </Grid>

              
              <Grid
                item
                xs={1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
              <div> Author</div>
              <div
                  className="userRow"
                  onClick={() => {
                    getUserByHandle(commentInfo.author).then((resp) => {
                      return swal({
                        title: `${resp.val().username}`,
                        icon: `${resp.val().avatarUrl ?? avatar}`,
                        closeOnEsc: true,
                        button: 'View details',
                        closeOnClickOutside: true
                      }).then((res) => {
                        if(res){

                        navigate(`/profile/${userInfo.username}`);
                        }
                      });
                    });
                  }}
                >
                  {userInfo?.avatarUrl ? (
                    <Avatar sx={{ width: 48, height: 48 }}>
                      <img
                        src={userInfo.avatarUrl}
                        className="profilePic"
                        alt="profile"
                      />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ width: 48, height: 48 }}>
                      <img src={avatar} className="profilePic" alt="profile" />
                    </Avatar>
                  )}
                  {commentInfo.author}
                </div>
          </Grid>
          <Grid
                item
                xs={1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}
              >
                <div>Rating</div>
          <div>{ratingButtons()}</div>
          </Grid>
    </Grid>

    </Item>
              {iconsField()}
              </div>
              </>
  )
}

export default CommentRow