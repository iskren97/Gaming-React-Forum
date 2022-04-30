import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import './CommentRow.css'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'lightgray',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.primary,
  marginTop: "1rem",
}));


function CommentRow({comment}) {
  console.log(comment)

  return (
    <Container maxWidth="md">
    <Item>

    <Grid container direction="row" sx={{marginTop: "10px", gap: '1.5rem', flexWrap: 'nowrap', justifyContent: 'flex-end'}} >
          <Grid item >
          {comment.content} 
          </Grid >
          <Grid item > 
          {comment.date}
          </Grid>
          <Grid item >
          {comment.author}
          </Grid>
          <Grid item style={{minWidth: "4rem"}}>
          <div> <ThumbDownAltIcon/>{comment.rating}<ThumbUpAltIcon/></div>
          </Grid>
    </Grid>


    </Item>
    </Container>
  )
}

export default CommentRow