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
import { getUserData, getUserByHandle } from '../../../services/users.service';
import {
  likePost,
  removeLikePost,
  dislikePost,
  removeDislikePost,
  deletePost,
  editPost,
  editPostTitle,
  editPostContent,
} from '../../../services/posts.service';

import Tooltip from '@mui/material/Tooltip';

import ReplyIcon from '@mui/icons-material/Reply';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import User from '../../../views/User/User';
import Profile from '../../../views/Profile/Profile';

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
  const headerRef = useRef(null);
  const { user, userData, setContext } = useContext(AppContext);
  const [postedBy, setPostedBy] = useState(null);
  const navigate = useNavigate();

  const isPostLiked = () => row?.likedBy?.includes(userData?.username);
  const isPostDisliked = () => row?.dislikedBy?.includes(userData?.username);

  let innerContent = '';
  !open
    ? row.content.length > 80
      ? (innerContent = row.content.slice(0, 120) + '...')
      : (innerContent = row.content)
    : (innerContent = row.content);

  useEffect(() => {
    if (elementRef.current.clientHeight) {
      setHeight(
        elementRef.current.clientHeight + headerRef.current.clientHeight + 26
      );
    }
  }, [open]);

  useEffect(() => {
    getUserByHandle(row.author).then((res) => {
      setPostedBy(res.val());
    });
  }, [postedBy]);

  const on_show_styles = {
    height: height,
    transition: 'height 0.15s ease-in',
    overflow: 'hidden',
    width: '100%',
  };
  const on_hide_styles = {
    height: height,
    transition: 'height 0.15s ease-out',
    overflow: 'hidden',
    width: '100%',
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

  const ratingButtons = () => {
    const loggedView = (
      <div className="rating-buttons">
        <ThumbDownAltIcon
          className={isPostDisliked() ? 'thumbDownIconFilled' : 'thumbDownIcon'}
          onClick={() => {
            isPostDisliked()
              ? removeDislikePost(userData?.username, row.id)
              : dislikePost(userData?.username, row.id);

            removeLikePost(userData?.username, row.id);
          }}
        />
        {(row.likedBy?.length || 0) - (row.dislikedBy?.length || 0)}
        <ThumbUpAltIcon
          className={isPostLiked() ? 'thumbUpIconFilled' : 'thumbUpIcon'}
          onClick={() => {
            isPostLiked()
              ? removeLikePost(userData?.username, row.id)
              : likePost(userData?.username, row.id);

            removeDislikePost(userData?.username, row.id);
          }}
        />
      </div>
    );

    const defaultView =
      (row.likedBy?.length || 0) - (row.dislikedBy?.length || 0);

    return !user || userData?.username === row.author
      ? defaultView
      : loggedView;
  };

  const handleDeletePost = () => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(row.id);
        swal('Post deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your post is safe!', {
          icon: 'success',
        });
      }
    });

    //deletePost(row.id)
  };

  const iconsField = () => {
    if (!user) {
      return null;
    } else if (userData.username === row.author) {
      return (
        <div className="iconsContainer">
          <Tooltip title="Reply to this post" placement="right-end">
            <ReplyIcon className="replyIcon" />
          </Tooltip>
          <Tooltip title="Edit this post" placement="right-end">
            <EditIcon className="editIcon" />
          </Tooltip>
          <Tooltip title="Edit this post" placement="right-end">
            <DeleteForeverIcon
              onClick={() => handleDeletePost()}
              className="deleteIcon"
            />
          </Tooltip>
        </div>
      );
    }

    const handleEditPost = () => {
      //editPost(row.id, row.title, row.content)

      swal({
        title: 'Edit title',
        text: "Edit your post's title",
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Title',
            type: 'text',
            value: row.title,
          },
        },
        buttons: true,
        dangerMode: true,
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
              icon: 'success',
            });

            swal({
              title: 'Edit content',
              text: "Edit your post's content",
              content: {
                element: 'input',
                attributes: {
                  placeholder: 'Content',
                  type: 'text',
                  value: row.content,
                },
              },
              buttons: true,
              dangerMode: true,
            }).then((content) => {
              if (content) {
                if (
                  content === '' ||
                  content.length < 32 ||
                  content.length > 8192
                ) {
                  swal(
                    'Something went wrong...',
                    'Post content must be between 32 and 8192 characters long!',
                    'error'
                  );
                  return false;
                }
                editPostContent(row.id, content);
                swal('Post content edited!', {
                  icon: 'success',
                });
              } else {
                swal('No changes were made to your post!', {
                  icon: 'success',
                });
              }
            });
          }
        } else {
          swal('No changes were made to your post!', {
            icon: 'success',
          });
        }
      });
    };

    const iconsField = () => {
      if (!user) {
        return null;
      } else if (userData.username === row.author) {
        return (
          <div className="iconsContainer">
            <Tooltip title="Reply to this post" placement="right-end">
              <ReplyIcon className="replyIcon" />
            </Tooltip>
            <Tooltip title="Edit this post" placement="right-end">
              <EditIcon onClick={() => handleEditPost()} className="editIcon" />
            </Tooltip>
            <Tooltip title="Edit this post" placement="right-end">
              <DeleteForeverIcon
                onClick={() => handleDeletePost()}
                className="deleteIcon"
              />
            </Tooltip>
          </div>
        );
      } else {
        return (
          <div className="iconsContainer">
            <Tooltip title="Reply to this post" placement="right-end">
              <ReplyIcon className="replyIcon" />
            </Tooltip>
          </div>
        );
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
                className="rowHeaderStyle"
              >
                <h2 ref={headerRef}> {row.title} </h2>
                <KeyboardArrowDownIcon
                  className={open ? 'arrowTriggered' : 'arrowTrigger'}
                  sx={{ transition: '0.25s ease-in-out' }}
                />
              </Grid>
              <Grid
                container
                direction="row-reverse"
                sx={{ marginTop: '10px' }}
              >
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
                  <div>Replies</div>
                  {row.replies || '0'}
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>Author</div>
                  <div
                    className="userRow"
                    onClick={() => {
                      getUserByHandle(row.author).then((resp) => {
                        return swal({
                          title: `${resp.val().username}`,
                          text: `${resp.val().firstName} ${resp.val().lastName}
                           Role: ${resp.val().role}`,
                          icon: `${resp.val().avatarUrl ?? avatar}`,
                          closeOnEsc: true,
                          button: 'View details',
                        }).then(() => {
                          navigate('/home');
                        });
                      });
                    }}
                  >
                    {postedBy?.avatarUrl ? (
                      <Avatar sx={{ width: 48, height: 48 }}>
                        <img
                          src={postedBy.avatarUrl}
                          className="profilePic"
                          alt="profile"
                        />
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
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
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                  ref={elementRef}
                >
                  {innerContent}
                </Grid>
              </Grid>
            </Grid>
          </Item>

          {iconsField()}

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
        </div>
      </>
    );
  };
};
export default TopicRow;
