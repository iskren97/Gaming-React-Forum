import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './TopicRow.css';
import { useState, useEffect, useRef, useContext } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentRow from './CommentRow/CommentRow';
import Avatar from '@mui/material/Avatar';
import avatar from '../../../assets/avatar.jpg';
import AppContext from '../../../providers/AppContext';
import { getUserByHandle } from '../../../services/users.service';
import {
  likePost,
  removeLikePost,
  dislikePost,
  removeDislikePost,
  deletePost,
  editPostTitle,
  editPostContent,
  commentPost
} from '../../../services/posts.service';

import Tooltip from '@mui/material/Tooltip';

import ReplyIcon from '@mui/icons-material/Reply';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';

import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary
}));

const TopicRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);
  const headerRef = useRef(null);
  const { user, userData } = useContext(AppContext);
  const [postedBy, setPostedBy] = useState(null);
  const navigate = useNavigate();

  const isPostLiked = () => row?.likedBy?.includes(userData?.username);

  const isPostDisliked = () => row?.dislikedBy?.includes(userData?.username);

  let innerContent = '';
  !open
    ? row.content?.length > 80
      ? (innerContent = row.content.slice(0, 80) + '...')
      : (innerContent = row.content)
    : (innerContent = row.content);

  useEffect(() => {
    if (elementRef.current.clientHeight) {
      setHeight(elementRef.current.clientHeight + headerRef.current.clientHeight + 26);
    }
  }, [open]);

  useEffect(() => {
    getUserByHandle(row.author).then((res) => {
      setPostedBy(res.val());
    });
  }, [row.author, row.likedBy, row.dislikedBy, row]);

  const handleLike = () => {
    if (isPostLiked()) {
      removeLikePost(userData?.username, row.id);
    } else {
      likePost(userData?.username, row.id);
      removeDislikePost(userData?.username, row.id);
    }
  };

  const handleDislike = () => {
    if (isPostDisliked()) {
      removeDislikePost(userData?.username, row.id);
    } else {
      dislikePost(userData?.username, row.id);
      removeLikePost(userData?.username, row.id);
    }
  };

  const on_show_styles = {
    height: height,
    transition: 'height 0.15s ease-in',
    overflow: 'hidden',
    width: '100%'
  };
  const on_hide_styles = {
    height: height,
    transition: 'height 0.15s ease-out',
    overflow: 'hidden',
    width: '100%'
  };

  const dateFormatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const dateFormatHour = (date) => {
    const d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;

    return [hours, minutes].join(':');
  };

  const ratingButtons = () => {
    const loggedView = (
      <div className="rating-buttons">
        <ThumbDownAltIcon
          className={isPostDisliked() ? 'thumbDownIconFilled' : 'thumbDownIcon'}
          onClick={() => handleDislike()}
        />
        {(row.likedBy?.length || 0) - (row.dislikedBy?.length || 0)}
        <ThumbUpAltIcon
          className={isPostLiked() ? 'thumbUpIconFilled' : 'thumbUpIcon'}
          onClick={() => handleLike()}
        />
      </div>
    );

    const defaultView = (row.likedBy?.length || 0) - (row.dislikedBy?.length || 0);

    return !user || userData?.username === row.author ? defaultView : loggedView;
  };

  const handleDeletePost = () => {
    swal({
      className: 'swal-red',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(row.id);
        swal('Post deleted!', {
          className: 'swal-green',
          icon: 'success'
        });
      } else {
        swal('Your post is safe!', {
          className: 'swal-green',
          icon: 'success'
        });
      }
    });
  };

  const handleEditTitle = () => {
    swal({
      title: 'Edit title',
      Text: 'Edit this posts title',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Title',
          type: 'text',
          value: row.title
        }
      }
    }).then((title) => {
      if (title) {
        if (title === '' || title.length < 16 || title.length > 64) {
          swal(
            'Something went wrong...',
            'Post title must be between 16 and 64 characters long!',
            'error'
          );
          return false;
        } else {
          editPostTitle(row.id, title);
          swal('Post title edited!', {
            icon: 'success'
          });
        }
      } else {
        swal('No changes were made to your post!', {
          icon: 'warning'
        });
      }
    });
  };

  const handleEditContent = () => {
    swal({
      title: 'Edit Content',
      Text: 'Edit this posts content',

      content: {
        element: 'input',
        attributes: {
          placeholder: 'content',
          type: 'text',
          value: row.content
        }
      }
    }).then((content) => {
      if (content) {
        if (content === '' || content.length < 32 || content.length > 8192) {
          swal(
            'Something went wrong...',
            'Post content must be between 32 and 8192 characters long!',
            'error'
          );
          return false;
        } else {
          editPostContent(row.id, content);
          swal('Post content edited!', {
            icon: 'success'
          });
        }
      } else {
        swal('No changes were made to your post!', {
          icon: 'warning'
        });
      }
    });
  };

  const handleComment = () => {
    swal({
      title: 'Comment',
      text: 'Comment on this post',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Type a comment to this post',
          type: 'text'
        }
      }
    }).then((comment) => {
      if (comment) {
        if (comment === '' || comment.length < 32 || comment.length > 8192) {
          swal(
            'Something went wrong...',
            'Post content must be between 32 and 8192 characters long!',
            'error'
          );
          return false;
        } else {
          commentPost(row.id, comment, userData.username);
          swal('Comment posted!', {
            icon: 'success'
          });
        }
      }
    });
  };

  const iconsField = () => {
    if (!user) {
      return null;
    } else if (userData.username === row.author) {
      if (userData.role === 'blocked') {
        return (
          <div className="iconsContainer">
            <Tooltip title="Edit this post's title" placement="right-end">
              <EditIcon onClick={() => handleEditTitle()} className="editIcon" />
            </Tooltip>

            <Tooltip title="Edit this post's content" placement="right-end">
              <EditIcon onClick={() => handleEditContent()} className="editIcon" />
            </Tooltip>

            <Tooltip title="Delete this post" placement="right-end">
              <DeleteForeverIcon onClick={() => handleDeletePost()} className="deleteIcon" />
            </Tooltip>
          </div>
        );
      } else {
        return (
          <div className="iconsContainer">
            <Tooltip title="Edit this post's title" placement="right-end">
              <EditIcon onClick={() => handleEditTitle()} className="editIcon" />
            </Tooltip>

            <Tooltip title="Edit this post's content" placement="right-end">
              <EditIcon onClick={() => handleEditContent()} className="editIcon" />
            </Tooltip>
            <Tooltip title="Reply to this post" placement="right-end">
              <ReplyIcon onClick={() => handleComment()} className="replyIcon" />
            </Tooltip>

            <Tooltip title="Delete this post" placement="right-end">
              <DeleteForeverIcon onClick={() => handleDeletePost()} className="deleteIcon" />
            </Tooltip>
          </div>
        );
      }
    } else if (userData.role === 'admin') {
      return (
        <div className="iconsContainer">
          <Tooltip title="Reply to this post" placement="right-end">
            <ReplyIcon onClick={() => handleComment()} className="replyIcon" />
          </Tooltip>

          <Tooltip title="Delete this post" placement="right-end">
            <DeleteForeverIcon onClick={() => handleDeletePost()} className="deleteIcon" />
          </Tooltip>
        </div>
      );
    } else {
      if (userData.role === 'blocked') {
        return null;
      } else {
        return (
          <div className="iconsContainer">
            <Tooltip title="Reply to this post" placement="right-end">
              <ReplyIcon onClick={() => handleComment()} className="replyIcon" />
            </Tooltip>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="topicRowContainer">
        <Item style={open ? on_show_styles : on_hide_styles}>
          <Grid container direction="column">
            <Grid
              container
              direction="row"
              onClick={() => setOpen(!open)}
              className="rowHeaderStyle">
              <h2 ref={headerRef}> {row.title} </h2>
              <KeyboardArrowDownIcon
                className={open ? 'arrowTriggered' : 'arrowTrigger'}
                sx={{ transition: '0.25s ease-in-out' }}
              />
            </Grid>

            <Grid container direction="row-reverse" sx={{ marginTop: '10px' }}>
              <Grid
                item
                xs={1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end'
                }}>
                <h2 style={{ color: '#FFBD33' }}>Rating</h2>

                <div>{ratingButtons()}</div>
              </Grid>

              <Grid
                item
                xs={1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end'
                }}>
                <h2 style={{ color: '#00aeff' }}>Replies</h2>

                {row.comments.length || '0'}
              </Grid>

              <Grid
                item
                xs={2}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}>
                <h2 style={{ color: '#47DB00' }}>Author</h2>

                <div
                  className="userRow"
                  onClick={() => {
                    getUserByHandle(row.author).then((resp) => {
                      return swal({
                        title: `${resp.val().username}`,
                        icon: `${resp.val().avatarUrl ?? avatar}`,
                        closeOnEsc: true,
                        button: 'View details',
                        closeOnClickOutside: true
                      }).then((res) => {
                        if (res) {
                          navigate(`/profile/${postedBy.username}`);
                        }
                      });
                    });
                  }}>
                  {postedBy?.avatarUrl ? (
                    <Avatar sx={{ width: 48, height: 48 }}>
                      <img src={postedBy.avatarUrl} className="profilePic" alt="profile" />
                    </Avatar>
                  ) : (
                    <Avatar sx={{ width: 48, height: 48 }}>
                      <img src={avatar} className="profilePic" alt="profile" />
                    </Avatar>
                  )}
                  {row.author}
                </div>
              </Grid>

              <Grid
                item
                xs={1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}>
                <h2>Date</h2>

                <div>{dateFormatDate(row.createdOn)}</div>
                <div>{dateFormatHour(row.createdOn)}</div>
              </Grid>

              <Grid
                item
                xs={7}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  fontSize: '16px',
                  overflow: 'hidden',
                  maxWidth: '75rem'
                }}
                ref={elementRef}>
                {innerContent}
              </Grid>
            </Grid>
          </Grid>
        </Item>

        {iconsField()}
      </div>
      {open ? (
        row.comments ? (
          <Grid
            container
            direction="column"
            justifyContent="stretch"
            alignItems="flex-end"
            alignContent="flex-end"
            sx={{ marginBottom: '10px' }}>
            {row.comments.map((comment, index) => {
              return <CommentRow key={index} postId={row.id} commentId={comment} />;
            })}
          </Grid>
        ) : null
      ) : null}
    </>
  );
};
export default TopicRow;
