import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './TopicRow.css'
import {useState, useEffect, useRef } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import CommentRow from './CommentRow/CommentRow'

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
  
  let innerContent = ''
  !open ? row.content.length > 80 ? innerContent = row.content.slice(0,120) + '...' : innerContent = row.content : innerContent = row.content;


  useEffect(() => {
    if(elementRef.current.clientHeight){
      
        setHeight(elementRef.current.clientHeight + headerRef.current.clientHeight + 26) 
    
    }
   },[open])
  

  const on_show_styles = {height: height, transition: "height 0.15s ease-in", overflow: "hidden", width: '100%'};
  const on_hide_styles = {height: height, transition: "height 0.15s ease-out", overflow: "hidden", width: '100%'};



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
              <div> <ThumbDownAltIcon/>{row.rating}<ThumbUpAltIcon/></div>
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
              {row.replies}
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
              {row.author}
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
              <div>Date</div>
              {row.date}
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
