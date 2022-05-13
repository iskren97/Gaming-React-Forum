import React from 'react'
import { useState, useEffect } from 'react'

import { Divider, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {
  getAllPosts,
  getCommentsFromUser,
  getPostById,
  getCommentById,
} from '../../../services/posts.service';

import './Achievements.css'

function Achievements({user}) {

  const [userStats, setUserStats] = useState({})
  const [ userScore, setUserScore ] = useState(0)
//Get number of Likes on posts(1 point) CHECKED

//Get number of comments on posts(4 points) CHECKED


//Get number of users posts(10 points) CHECKED
//_________________________________________
//Get total number of likes on our posts(3 points) CHECKED

//Get total number of dislikes on our posts( -2 point) CHECKED
//__________________________________________
//Get total number of likes on our comments(2 points)

//Get total number of dislikes on our comments( -1 Point)
//______________________________________________
//Get total number of comments on our posts(5 points) CHECKED





  
  const getUserStats = async () => {
    const posts = await getAllPosts()
    const comments = await getCommentsFromUser(user.username).then(res => res.val())
    const likedPosts = posts.reduce((acc, post) => {

      if (post.likedBy.includes(user.username)){
        acc++
      }
      return acc 
    }, 0)
    const dislikedPosts = posts.reduce((acc, post) => {
      if(post.dislikedBy.includes(user.username)){
        acc++
      }
      return acc
    }
    , 0)

    const numberOfPosts = posts.reduce((acc,post) =>{
      if(post.author === user.username) acc++
      return acc
    }, 0 )

    const commentsOnPosts = comments ? Object.keys(comments).length : 0
 
    const likesOnPosts = posts.reduce((acc, post) => {
      if(post.author === user.username){
        if(post.likedBy){
        acc += Object.keys(post.likedBy).length

        }
      }

      return acc
    }
    , 0)

    
    const dislikesOnPosts = posts.reduce((acc, post) => {
      if(post.author === user.username){
        if(post.dislikedBy){
        acc += Object.keys(post.dislikedBy).length

        }
      }

      return acc
    }
    , 0)

  
    const commentsOnMyPosts = posts.reduce((acc, post) => {
      if(post.author === user.username){
        if(post.comments){
        acc += Object.keys(post.comments).length

        }
      }
      return acc
    }, 0)

    const userStats = {
      likedPosts,
      dislikedPosts,
      numberOfPosts,
      commentsOnPosts,
      likesOnPosts,
      dislikesOnPosts,
      commentsOnMyPosts
    }

    return userStats


}



  getUserStats().then(stats => {
    setUserStats(stats)
    setUserScore(stats.likedPosts + (stats.numberOfPosts * 10 )+( stats.commentsOnPosts * 4) + (stats.likesOnPosts * 3) - (stats.dislikesOnPosts * 2) + (stats.commentsOnMyPosts * 5))
  })




  const setUsersRank = (level) =>{
    if(user.role === "admin"){
      return "Game Master"
    }else if(level === 0){
      return "Noob"
    }else if(level > 0 && level <5 ){
      return "Grunt"
    }else if(level > 4 && level < 10){  
      return "Apprentice"
    }else if(level > 9 && level < 15){
      return "Warrior"
    }else if(level > 14 && level < 20){
      return "Berzerker"
    }else if(level > 19 && level < 30){
      return "Legion Commander"
    }else if(level > 29 & level < 50){
      return "Master"
    }else{
      return "Grand Master"
    }



  }


  const containerStyles = {
    height: 20,
    width: '20em',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: "3rem",
    marginBottom: "3rem",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
  }

  const fillerStyles = {
    height: '100%',
    width: `${(userScore%30)/30*100}%`,
    backgroundColor: "green",
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'all 0.75s ease',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

//  console.log(userStats)

  // console.log(user)
  // console.log(userStats)
  return (
    <>
    <div className="statsContainer">
      <h1> My Stats </h1>
      <h2>
      Level: {Math.floor(userScore/30)} 
      {" "}
      <Tooltip title={
          <div>Current level.<br/>
          Every 30 points grant  1 level 
    </div>} placement="right-end">

       <InfoOutlinedIcon fontSize="small" />
       </Tooltip>
      </h2>
<h2>
    Score: {userScore} points  <Tooltip title={<div>Total score - the sum of all of the interactions with other users. The score is calculated by the following principle:<br/>
 - 1 Like - +1 point <br/>
 - 1 Comment - +4 points <br/>
 - 1 Post - +10 points<br/>
-----------------------------<br/>
- 1 Like on your post - +3 points<br/>
- 1 Dislike on your post - -2 points<br/>
- 1 Comment on your post - +5 points
    </div>} placement="right-end">

       <InfoOutlinedIcon fontSize="small" />
       </Tooltip>
</h2>

<h2>
    Rank: {setUsersRank(Math.floor(userScore/30))} <Tooltip title={<div>
      0 Level - Noob<br/>
1 - 4 Level - Grunt<br/>
5-10 Level - Apprentice<br/>
10 - 15 Level - Warrior<br/>
15-20 Level - Berzerker<br/>
20-30 Level - Legion Commander<br/>
30-49 Level -  Master<br/>
50 Level - Grand Master<br/>
<br/>
Admin - Game Master

    </div>} placement="right-end">

       <InfoOutlinedIcon fontSize="small" />
       </Tooltip>
</h2>
    <div style={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}}>
   <h3>Level {Math.floor(userScore/30)} </h3> 
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${((userScore%30)/30*100).toFixed(2)}%`}</span>
      </div>
    </div>
    <h3>Level {Math.ceil(userScore/30)}</h3> 
    </div>

    <div className="statsElements">
      <div className="singleElement">
      <h2>{userStats.likedPosts}</h2>
      <h3>Liked Posts</h3>
      </div>
      <div className="singleElement">
      <h2>{userStats.dislikedPosts}</h2>
      <h3>Disliked Posts</h3>
      </div>
      <div className="singleElement">
      <h2>{userStats.numberOfPosts}</h2>
      <h3>Number of Posts</h3>
      </div>
      <div className="singleElement">
      <h2>{userStats.commentsOnPosts}</h2>
      <h3>Comments on Posts</h3>
      </div>
      <div className="singleElement">
      <h2>{userStats.likesOnPosts}</h2>
      <h3>Likes on Posts</h3>
      </div>
      <div className="singleElement">
      <h2>{userStats.dislikesOnPosts}</h2>
      <h3>Dislikes on Posts</h3>
      </div>
      <div className="singleElement">
      <h2>{userStats.commentsOnMyPosts}</h2>
      <h3>Comments on my posts</h3>
      </div>


</div>
</div>
    </>
  )
}

export default Achievements