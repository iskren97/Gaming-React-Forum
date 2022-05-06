import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './TopicRow.css'
import {useState, useEffect, useRef, useContext } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentRow from './CommentRow/CommentRow'
import Avatar from '@mui/material/Avatar';
import avatar from '../../../assets/avatar.jpg';
import AppContext from '../../../providers/AppContext';
import { getUserData, getUserByHandle } from '../../../services/users.service';
import { likePost, removeLikePost, dislikePost, removeDislikePost } from '../../../services/posts.service';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.primary,
}));


const TopicRow = ({ row }) => {

  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);
  const headerRef = useRef(null)
  const {user, userData, setContext} = useContext(AppContext)
  const [postedBy, setPostedBy] = useState(null)

  const isPostLiked = () => row?.likedBy?.includes(userData?.username);
  const isPostDisliked = () => row?.dislikedBy?.includes(userData?.username);

  let innerContent = ''
  !open ? row.content.length > 80 ? innerContent = row.content.slice(0,120) + '...' : innerContent = row.content : innerContent = row.content;


  useEffect(() => {
    if(elementRef.current.clientHeight){ 
        setHeight(elementRef.current.clientHeight + headerRef.current.clientHeight + 26) 
    }
   },[open])


   useEffect(()=>{
    getUserByHandle(row.author).then(res => {
      setPostedBy(res.val())
    })
   },[postedBy])

  

  const on_show_styles = {height: height, transition: "height 0.15s ease-in", overflow: "hidden", width: '100%'};
  const on_hide_styles = {height: height, transition: "height 0.15s ease-out", overflow: "hidden", width: '100%'};




 const dateFormatDate = (date) => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  
  return [year, month, day].join('-');
}
const dateFormatHour = (date) => {
  let d = new Date(date);
  let hours = d.getHours();
  let minutes = d.getMinutes();

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  return [hours, minutes].join(":");
}


  const ratingButtons = () =>{

    const loggedView = <div className='rating-buttons'>
    <ThumbDownAltIcon className={isPostDisliked() ? "thumbDownIconFilled" : "thumbDownIcon" } onClick={()=>{
             isPostDisliked() ? 
             removeDislikePost(userData?.username, row.id) :
             dislikePost(userData?.username, row.id) 

             removeLikePost(userData?.username, row.id)
              }} />
        { (row.likedBy?.length || 0) - (row.dislikedBy?.length || 0)}
         <ThumbUpAltIcon className={isPostLiked() ? "thumbUpIconFilled" : "thumbUpIcon"} onClick={()=> {
           isPostLiked() ? 
           removeLikePost(userData?.username, row.id) :
           likePost(userData?.username, row.id)

           removeDislikePost(userData?.username, row.id)
            }} />
            </div>
            
      const defaultView =  (row.likedBy?.length || 0) - (row.dislikedBy?.length || 0)

    return ( user ? loggedView : defaultView

    )
  }


  return (
    <>
      <Item style={open ? on_show_styles : on_hide_styles}>
        <Grid container direction="column">
          <Grid
            container
            direction="row"
            onClick={() => setOpen(!open)}
            className="rowHeaderStyle"
          >
            <h2 ref={headerRef}> {row.title} </h2>
            <KeyboardArrowDownIcon
              className={open ? "arrowTriggered" : "arrowTrigger"}
              sx={{ transition: "0.25s ease-in-out" }}
            />
          </Grid>
          <Grid container direction="row-reverse" sx={{ marginTop: "10px" }}>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <div>Rating</div>
              <div>
              {ratingButtons()}
              </div>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <div>Replies</div>
              {row.replies || "0"}
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <div>Author</div>
              <div className="userRow">
              {postedBy?.avatarUrl ? (
                <Avatar sx={{ width: 48, height: 48}}>
                  <img src={postedBy.avatarUrl} className="profilePic" alt="profile"/>
                  </Avatar>
                ) : (
                  <Avatar sx={{ width: 48, height: 48 }}>
                  <img
                    src={avatar}
                    className="profilePic"
                    alt="profile"
                  />
                  </Avatar>
                )}
              {row.author}
              </div>
            </Grid>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div>Date</div>

              <div>{dateFormatDate(row.createdOn)}</div>
              <div>{dateFormatHour(row.createdOn)}</div>

            </Grid>
            <Grid
              item
              xs={7}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              ref={elementRef}
            >
              {innerContent}
            </Grid>
          </Grid>
        </Grid>
      </Item>

      {open ? (
        row.comments ? (
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-end"
            alignContent="flex-end"
          >
            {row.comments.map((comment, index) => {
              return <CommentRow key={index} comment={comment} />;
            })}
          </Grid>
        ) : null
      ) : null}
    </>
  );
};

export default TopicRow;
