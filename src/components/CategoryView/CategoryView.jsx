import React from 'react'
import background from '../../assets/gamesBackground.jpg'
import './CategoryView.css'
import Button from '@mui/material/Button';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




function createData(topic, title, author, date, replies, rating) {
  return { topic, title, author, date, replies, rating };
}

const rows = [
  createData('Shooter', "Crosshair picks", "Lil Camper", "20/4/2022", 3, 2),
  createData('Action', "Are we ever going to see Just Cause 5?", "thrills3eker101","31.05/2021", 67, 81),
  createData('RPG', "WoW retri paladin build", "RetriOverProt", "8/08/2022",49, 3),
  createData('RPG', "Where to go after final boss", "justLost", "8/11/2022",13, 21),
  createData('Shooter', "Best gaming moust for CS GO", "DumbAi", "3/08/2022",9, 9),
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
            <TableCell align="center" style={{fontWeight: "bold"}}>Topic</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Title</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Author</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Replies</TableCell>
            <TableCell align="center" style={{fontWeight: "bold"}}>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="tableRow"
            >
              
              <TableCell align="center" >{row.topic}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.replies}</TableCell>
              <TableCell align="center">{row.rating}</TableCell>
            </TableRow>
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