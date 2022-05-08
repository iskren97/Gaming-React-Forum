import React from 'react'
import background from '../../assets/gamesBackground.jpg'
import './CategoryView.css'
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TopicRow from './TopicRow/TopicRow';
import TopicPostModal from './TopicPostModal/TopicPostModal'
import AppContext from '../../providers/AppContext'
import { NavLink } from 'react-router-dom';

import { getAllPosts } from '../../services/posts.service';
import LoginModal from '../JoinCommunityModal/JoinModal';


const comments = [
  {
    author: "JimmyBoy",
    content: "Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?Game is goood. I LIKED PREVIOUS BETTER BUT HEY.LETS ADD SOME LINES UH?",
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

 
function CategoryView({topic}) {
  
 const [postModal, setPostModal] = useState(false)
 const {user, userData, setContext} = useContext(AppContext)
 const [categoryPosts, setCategoryPosts] = useState([])


 

  const onClose = () => {
    setPostModal(!postModal)
  }
  

  useEffect(()=>{
    
getAllPosts().then(posts =>{ 
  const filtered = [];
  
  posts.forEach(post => {
    if(post.category === topic){
      filtered.push(post)
    }
  })
  setCategoryPosts(filtered)})
    
  },[topic, categoryPosts])



  return (<>
  
      
    <div  className="viewContainer">  
    <div className="hero-image">
         <img src={background} alt="background" ></img>
         </div>
    
      {postModal  ? <TopicPostModal onClose={onClose} category={topic} postModal={postModal} setPostModal={setPostModal} /> : null}

         <div className="categoryRow">
            <div className="buttonsGroup">
            {user ? <Button onClick={()=>setPostModal(!postModal)} variant="contained" style={{borderRadius: "2em"}}>Create a Post</Button> : null}
            </div>
            <div className="buttonsGroup">

                <Button variant="contained" style={{borderRadius: "2em"}}>Category</Button>
                <Button variant="contained" style={{borderRadius: "2em"}}>Top</Button>
                <Button variant="contained" style={{borderRadius: "2em"}}>Latest</Button>
                <Button variant="contained" style={{borderRadius: "2em"}}>Liked</Button>
            </div>
        </div>


    <Container
    maxWidth="xl"
    sx={{
      height: 'auto',
      backgroundColor: 'white',
      boxShadow: '0 1px 6px rgba(0,0,0,0.2)',
      marginTop: '2rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
    }}
  >
    <Grid container direction="column">
      <Grid item xs={12}>
        <h1><NavLink to="/">Home</NavLink> {">"} {topic}</h1>
      </Grid>


      {categoryPosts.length !== 0 ? categoryPosts.map((row) => (
      <Grid sx={{marginTop: "0.5rem"}} >         
       <TopicRow row={row} />
      </Grid>
     ))
     :
        <div>
        <h3> There are no posts in this category. Be the first one to post! {user ? <Button onClick={()=>setPostModal(!postModal)} variant="contained" style={{borderRadius: "2em"}}>Create a Post</Button> :  <a className="join-button">
            <LoginModal />
          </a>}</h3>
        
        
        </div>
     }

    
    
    </Grid>
  </Container>
  </div>

  </>
  )
  
}

export default CategoryView



// function CategoryView() {
  
 
  

//   return (
//     <div className="viewContainer">
//     <div className="hero-image">
//     <img src={background} alt="background" ></img>
//     </div>



    
//     <div className="contentContainer"> 
//     <div className="categoryRow">
//       <span className="categoryTitle">  Gaming Discussions &gt; Shooters  </span>
//         <div className="buttonsGroup">
//         <Button variant="contained" style={{borderRadius: "2em"}}>Category</Button>
//         <Button variant="contained" style={{borderRadius: "2em"}}>Top</Button>
//         <Button variant="contained" style={{borderRadius: "2em"}}>Latest</Button>
//         <Button variant="contained" style={{borderRadius: "2em"}}>Liked</Button>
//         </div>
//     </div>
     

    

//     <div className="gridContainer" >
//     <TableContainer >
//       <Table sx={{ width: "100%" }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" style={{fontWeight: "bold"}}>Title</TableCell>
//             <TableCell align="center" style={{fontWeight: "bold"}}>Content</TableCell>
//             <TableCell align="center" style={{fontWeight: "bold"}}>Author</TableCell>
//             <TableCell align="center" style={{fontWeight: "bold"}}>Date</TableCell>
//             <TableCell align="center" style={{fontWeight: "bold"}}>Replies</TableCell>
//             <TableCell align="center" style={{fontWeight: "bold"}}>Rating</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
              
//            <TableRowComponent row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>


//     </div>


//       </div>

//     </div>
//   )
// }
