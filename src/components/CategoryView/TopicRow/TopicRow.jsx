import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './TopicRow.css'
import {useState, useEffect, useRef } from 'react'

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
  !open ? innerContent = row.content.slice(0,40) + '...' : innerContent = row.content;


  useEffect(() => {
    if(elementRef.current.clientHeight){
      
        setHeight(elementRef.current.clientHeight + headerRef.current.clientHeight + 16) 
    
    }
   })
  

  const on_show_styles = {height: height, transition: "height 0.15s ease-in", overflow: "hidden"};
  const on_hide_styles = {height: height, transition: "height 0.15s ease-out", overflow: "hidden"};




  return (
    <Item onClick={(()=> setOpen(!open))} style={open ? on_show_styles : on_hide_styles} >
        <Grid container direction="column" >
          <h2 ref={headerRef} >{row.title}</h2>
          <Grid container direction="row-reverse" >
          <Grid item={true} xs={1} style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
          {row.rating}
          </Grid>
          <Grid item={true} xs={1} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {row.replies}
          </Grid>
          <Grid item={true} xs={2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {row.author}
          </Grid>
          <Grid item={true} xs={2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {row.date}
          </Grid>
          <Grid item={true} xs={6} style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}} ref={elementRef}  >
          {innerContent} 
          </Grid>
          </Grid>
        </Grid>
     
    </Item>
  );
};

export default TopicRow;
