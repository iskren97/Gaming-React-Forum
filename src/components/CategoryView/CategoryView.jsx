import React from 'react'
import background from '../../assets/gamesBackground.jpg'
import './CategoryView.css'
import Button from '@mui/material/Button';

import {useState} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import TableRowComponent from './TableRowComponent/TableRowComponent'


const comments = [
  {
    author: "JimmyBoy",
    content: "Game is goood",
    date: "21/03/12",
    rating: "5"

  },{
    author: "Your boy",
    content: "bad game",
    date: "21/1/22",
    rating: "3"
    
  },{
    author: "FatBoiFat",
    content: "Got nuggets?",
    date: "21/05/12",
    rating: "1"
    
  }
]


function createData(title, content, author, date, replies, rating,comments) {
  return {title, content, author, date, replies, rating,comments };
}

const rows = [
  createData( "Crosshair picks","So what would you guys say is the best crosshair? I think about a classic red dot or a cross but want to hear your opinions on the topic. What are your favorite colors? i feel some games are better with a dot and other with a cross. Any software that could do that for me? I see the MSI monitors have them build in but i'm not sure. And i want to text some more to have a bit more lines here.i feel some games are better with a dot and other with a cross. Any software that could do that for me? I see the MSI monitors have them build in but i'm not sure. And i want to text some more to have a bit more lines here.i feel some games are better with a dot and other with a cross. Any software that could do that for me? I see the MSI monitors have them build in but i'm not sure. And i want to text some more to have a bit more lines here.", "Lil Camper", "20/4/2022", 3, 2, comments),
  createData( "Are we ever going to see Just Cause 5?"," YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.", "thrills3eker101","31.05/2021", 67, 81),
  createData( "WoW retri paladin build","IT's just the best i no.", "RetriOverProt", "8/08/2022",49, 3),
  createData( "Where to go after final boss","Now i have no life...HALP ", "justLost", "8/11/2022",13, 21),
  createData( "Best gaming moust for CS GO","Issi worth spending 200 dollers on am mouse", "DumbAi", "3/08/2022",9, 9),
];

 
function CategoryView() {
  
 
  

  return (
    <div className="viewContainer">
    <div className="hero-image">
    <img src={background} alt="background" ></img>
    </div>



    
    <div className="contentContainer"> 
    <div className="categoryRow">
      <span className="categoryTitle">  Gaming Discussions &gt; Shooters  </span>
        <div className="buttonsGroup">
        <Button variant="contained" style={{borderRadius: "2em"}}>Category</Button>
        <Button variant="contained" style={{borderRadius: "2em"}}>Top</Button>
        <Button variant="contained" style={{borderRadius: "2em"}}>Latest</Button>
        <Button variant="contained" style={{borderRadius: "2em"}}>Liked</Button>
        </div>
    </div>
     

    

    <div className="gridContainer" >
    <TableContainer >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{fontWeight: "bold"}}>Title</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Content</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Author</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Replies</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              
           <TableRowComponent row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </div>


      </div>

    </div>
  )
}

export default CategoryView