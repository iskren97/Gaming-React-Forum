import React from 'react'
import { useState, useEffect } from 'react'



import {
  getAllPosts,
  getCommentsFromUser,
  getPostById,
  getCommentById,
} from '../../../services/posts.service';

function Achievements({user}) {

  const [userStats, setUserStats] = useState({})
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

  

    const userStats = {
      likedPosts,
      dislikedPosts,
      numberOfPosts,
      commentsOnPosts,
      likesOnPosts,
      dislikesOnPosts,

    }

    return userStats


}



  getUserStats().then(stats => {
    setUserStats(stats)

  })





//  console.log(userStats)

  // console.log(user)
  // console.log(userStats)
  return (
    <>
      <h1> My Stats </h1>

      <h2>Liked Posts: {userStats.likedPosts}</h2>
      <h2>Disliked Posts: {userStats.dislikedPosts}</h2>
      <h2>Number of Posts: {userStats.numberOfPosts}</h2>
      <h2>Comments on Posts: {userStats.commentsOnPosts}</h2>
      <h2>Likes on Posts: {userStats.likesOnPosts}</h2>
      <h2>Dislikes on Posts: {userStats.dislikesOnPosts}</h2>
      



    </>
  )
}

export default Achievements