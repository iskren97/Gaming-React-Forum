import React from 'react'
import { useState } from 'react'

import './TableRowComponent.css'



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function TableRowComponent({row}) {

  const [closed, setClosed] = useState(true);

  console.log(row.comments)

  return (

      <>
       <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="tableRow"
              onClick={ ()=>{ setClosed(!closed)}}
            >
              
              <TableCell align="center" >{row.title}</TableCell>
              <TableCell  align="center" style={{maxWidth: "20rem"}}>{ closed ? 
    row.content.slice(0,35) : row.content
  }</TableCell>
              <TableCell align="center">{row.author}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.replies}</TableCell>
              <TableCell align="center">{row.rating}</TableCell>
            </TableRow>


  



        {(row.comments && !closed) && row.comments.map(comment =>{

       
            
          

          return  <TableRow key={comment.name} rowspan="1">
          <TableCell colspan="6" style={{ "text-align": "right", backgroundColor: "rgb(133, 180, 194)" }}>
          
          {/* { comment.content}  {comment.author} {comment.date} {comment.rating} */}
          <div class="replyContainer">
          <div class="replyElement">
          {comment.author}
          </div>
          <div>
            {comment.content}
          </div>
          <div>
            {comment.date}
          </div>
          <div>
            {comment.rating}
          </div>
          
          </div>
          
          </TableCell>
          </TableRow>
        })
        
        
        
        }
         
            
           
          </>

             
          
   
  )
}

export default TableRowComponent