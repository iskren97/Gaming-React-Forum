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
    
  },[categoryPosts])


  return (<>
  
      
    <div  className="viewContainer">  
    <div className="hero-image">
         <img src={background} alt="background" ></img>
         </div>
    
      {postModal  ? <TopicPostModal onClose={onClose} category={topic}/> : null}

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
