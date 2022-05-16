import React from 'react';
import { useState, useContext } from 'react';

import { Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AppContext from '../../../providers/AppContext';
import bigMouthAchievement from './achievementLogos/BigMouth.jpg';
import conversationStarterAchievement from './achievementLogos/conversationStarter.jpg';
import controversialOpinion from './achievementLogos/controversialOpinion.png';
import loveGiver from './achievementLogos/loveGiver.jpg';
import mrFamous from './achievementLogos/mrFamous.jpg';

import { getAllPosts, getCommentsFromUser } from '../../../services/posts.service';

import './Achievements.css';

const Achievements = ({ user }) => {
  const [userStats, setUserStats] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [userAchievements, setUserAchievements] = useState(null);
  const { userData } = useContext(AppContext);

  const getUserStats = async () => {
    const posts = await getAllPosts();
    const comments = await getCommentsFromUser(user?.username).then((res) => res.val());
    const likedPosts = posts.reduce((acc, post) => {
      if (post.likedBy.includes(user?.username)) {
        acc++;
      }
      return acc;
    }, 0);
    const dislikedPosts = posts.reduce((acc, post) => {
      if (post.dislikedBy.includes(user?.username)) {
        acc++;
      }
      return acc;
    }, 0);

    const numberOfPosts = posts.reduce((acc, post) => {
      if (post.author === user?.username) acc++;
      return acc;
    }, 0);

    const commentsOnPosts = comments ? Object.keys(comments).length : 0;

    const likesOnPosts = posts.reduce((acc, post) => {
      if (post.author === user?.username) {
        if (post.likedBy) {
          acc += Object.keys(post.likedBy).length;
        }
      }

      return acc;
    }, 0);

    const dislikesOnPosts = posts.reduce((acc, post) => {
      if (post.author === user?.username) {
        if (post.dislikedBy) {
          acc += Object.keys(post.dislikedBy).length;
        }
      }

      return acc;
    }, 0);

    const commentsOnMyPosts = posts.reduce((acc, post) => {
      if (post.author === user?.username) {
        if (post.comments) {
          acc += Object.keys(post.comments).length;
        }
      }
      return acc;
    }, 0);

    const stats = {
      likedPosts,
      dislikedPosts,
      numberOfPosts,
      commentsOnPosts,
      likesOnPosts,
      dislikesOnPosts,
      commentsOnMyPosts
    };

    return stats;
  };

  getUserStats().then((stats) => {
    setUserStats(stats);
    setUserScore(
      stats.likedPosts
        + stats.numberOfPosts * 10
        + stats.commentsOnPosts * 4
        + stats.likesOnPosts * 3
        - stats.dislikesOnPosts * 2
        + stats.commentsOnMyPosts * 5
    );

    const achivs = {
      bigMouth: 'Locked',
      conversationStarter: 'Locked',
      controversialOpinion: 'Locked',
      loveGiver: 'Locked',
      mrFamous: 'Locked'
    };

    if (stats.numberOfPosts >= 10) {
      achivs.conversationStarter = 'Uncommon';
    } else if (stats.numberOfPosts >= 50) {
      achivs.conversationStarter = 'Rare';
    } else if (stats.numberOfPosts >= 100) {
      achivs.conversationStarter = 'Epic';
    } else if (stats.numberOfPosts >= 250) {
      achivs.conversationStarter = 'Legendary';
    }

    if (stats.likedPosts >= 10) {
      achivs.loveGiver = 'Uncommon';
    } else if (stats.likedPosts >= 50) {
      achivs.loveGiver = 'Rare';
    } else if (stats.likedPosts >= 100) {
      achivs.loveGiver = 'Epic';
    } else if (stats.likedPosts >= 250) {
      achivs.loveGiver = 'Legendary';
    }

    if (stats.commentsOnPosts >= 10) {
      achivs.bigMouth = 'Uncommon';
    } else if (stats.commentsOnPosts >= 50) {
      achivs.bigMouth = 'Rare';
    } else if (stats.commentsOnPosts >= 100) {
      achivs.bigMouth = 'Epic';
    } else if (stats.commentsOnPosts >= 250) {
      achivs.bigMouth = 'Legendary';
    }

    if (stats.likesOnPosts >= 10) {
      achivs.mrFamous = 'Uncommon';
    } else if (stats.likesOnPosts >= 50) {
      achivs.mrFamous = 'Rare';
    } else if (stats.likesOnPosts >= 100) {
      achivs.mrFamous = 'Epic';
    } else if (stats.likesOnPosts >= 250) {
      achivs.mrFamous = 'Legendary';
    }

    if (stats.commentsOnMyPosts >= 10) {
      achivs.controversialOpinion = 'Uncommon';
    } else if (stats.commentsOnMyPosts >= 50) {
      achivs.controversialOpinion = 'Rare';
    } else if (stats.commentsOnMyPosts >= 100) {
      achivs.controversialOpinion = 'Epic';
    } else if (stats.commentsOnMyPosts >= 250) {
      achivs.controversialOpinion = 'Legendary';
    }

    setUserAchievements(achivs);
  });

  const setUsersRank = (level) => {
    if (user.role === 'admin') {
      return 'Game Master';
    } else if (level === 0) {
      return 'Noob';
    } else if (level > 0 && level < 5) {
      return 'Grunt';
    } else if (level > 4 && level < 10) {
      return 'Apprentice';
    } else if (level > 9 && level < 15) {
      return 'Warrior';
    } else if (level > 14 && level < 20) {
      return 'Berzerker';
    } else if (level > 19 && level < 30) {
      return 'Legion Commander';
    } else if ((level > 29) & (level < 50)) {
      return 'Master';
    } else {
      return 'Grand Master';
    }
  };

  const containerStyles = {
    height: 20,
    width: '20em',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    marginTop: '3rem',
    marginBottom: '3rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem'
  };

  const fillerStyles = {
    height: '100%',
    width: `${((userScore % 30) / 30) * 100}%`,
    backgroundColor: 'rgb(0, 255, 64)',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'all 0.75s ease'
  };

  const labelStyles = {
    padding: 5,
    color: 'black',
    fontWeight: 'bold'
  };

  return (
    <>
      <div className="statsContainer">
        <h1 style={{ color: 'rgb(0, 255, 64)' }}>
          {' '}
          {user?.username === userData?.username ? 'My Stats' : 'Stats'}
        </h1>

        <h2>
          Level: {Math.floor(userScore / 30)}{' '}
          <Tooltip
            title={
              <div>
                Current level.
                <br />
                Every 30 points grant 1 level
              </div>
            }
            placement="right-end">
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        </h2>

        <h2>
          Score: {userScore} points{' '}
          <Tooltip
            title={
              <div>
                Total score - the sum of all of the interactions with other users. The score is
                calculated by the following principle:
                <br />
                - 1 Like - +1 point <br />
                - 1 Comment - +4 points <br />
                - 1 Post - +10 points
                <br />
                -----------------------------
                <br />
                - 1 Like on your post - +3 points
                <br />
                - 1 Dislike on your post - -2 points
                <br />- 1 Comment on your post - +5 points
              </div>
            }
            placement="right-end">
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        </h2>

        <h2>
          Rank: {setUsersRank(Math.floor(userScore / 30))}{' '}
          <Tooltip
            title={
              <div>
                0 Level - Noob
                <br />
                1 - 4 Level - Grunt
                <br />
                5-10 Level - Apprentice
                <br />
                10 - 15 Level - Warrior
                <br />
                15-20 Level - Berzerker
                <br />
                20-30 Level - Legion Commander
                <br />
                30-49 Level - Master
                <br />
                50 Level - Grand Master
                <br />
                <br />
                Admin - Game Master
              </div>
            }
            placement="right-end">
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <h3>Level {Math.floor(userScore / 30)} </h3>
          <div style={containerStyles}>
            <div style={fillerStyles}>
              <span style={labelStyles}>{`${(((userScore % 30) / 30) * 100).toFixed(2)}%`}</span>
            </div>
          </div>

          <h3>Level {Math.ceil(userScore / 30)}</h3>
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

        <h1 style={{ color: 'rgb(0, 255, 64)' }}> Achievements </h1>

        <div className="achievementsContainer">
          <div className="achievementElement">
            <Tooltip
              title={
                <div>
                  <h3>{userAchievements?.bigMouth} Big Mouth</h3> <br />
                  Uncommon: 10 comments on posts <br />
                  Rare: 50 comments on posts <br />
                  Epic: 100 comments on posts <br />
                  Legendary: 250 comments on posts <br />
                </div>
              }
              placement="bottom">
              <div className={'hexagonBackground' + ' ' + userAchievements?.bigMouth}>
                <div className="hexagon">
                  <img src={bigMouthAchievement} alt="achievement1" />
                </div>
              </div>
            </Tooltip>
          </div>

          <div className="achievementElement">
            <Tooltip
              title={
                <div>
                  <h3>{userAchievements?.conversationStarter} Conversation Starter</h3> <br />
                  Uncommon: 10 posts <br />
                  Rare: 50 posts <br />
                  Epic: 100 posts <br />
                  Legendary: 250 posts <br />
                </div>
              }
              placement="bottom">
              <div className={'hexagonBackground' + ' ' + userAchievements?.conversationStarter}>
                <div className="hexagon">
                  <img src={conversationStarterAchievement} alt="achievement1" />
                </div>
              </div>
            </Tooltip>
          </div>

          <div className="achievementElement">
            <Tooltip
              title={
                <div>
                  <h3>{userAchievements?.controversialOpinion} Controversial Opinion</h3> <br />
                  Uncommon: 10 comments on users posts <br />
                  Rare: 50 comments on users posts <br />
                  Epic: 100 comments on users posts <br />
                  Legendary: 250 comments on users posts <br />
                </div>
              }
              placement="bottom">
              <div className={'hexagonBackground' + ' ' + userAchievements?.controversialOpinion}>
                <div className="hexagon">
                  <img src={controversialOpinion} alt="achievement1" />
                </div>
              </div>
            </Tooltip>
          </div>

          <div className="achievementElement">
            <Tooltip
              title={
                <div>
                  <h3>{userAchievements?.loveGiver} Love Giver</h3> <br />
                  Uncommon: 10 Liked posts <br />
                  Rare: 50 Liked posts <br />
                  Epic: 100 Liked posts <br />
                  Legendary: 250 Liked posts <br />
                </div>
              }
              placement="bottom">
              <div className={'hexagonBackground' + ' ' + userAchievements?.loveGiver}>
                <div className="hexagon">
                  <img src={loveGiver} alt="achievement1" />
                </div>
              </div>
            </Tooltip>
          </div>

          <div className="achievementElement">
            <Tooltip
              title={
                <div>
                  <h3>{userAchievements?.mrFamous} Mr. Famous</h3> <br />
                  Uncommon: 10 Likes on users posts <br />
                  Rare: 50 Likes on users posts <br />
                  Epic: 100 Likes on users posts <br />
                  Legendary: 250 Likes on users posts <br />
                </div>
              }
              placement="bottom">
              <div className={'hexagonBackground' + ' ' + userAchievements?.mrFamous}>
                <div className="hexagon">
                  <img src={mrFamous} alt="achievement1" />
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievements;
