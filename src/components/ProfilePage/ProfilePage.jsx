import React from "react";
import background from "../../assets/lR2zdL.jpg";
import avatar from '../../assets/avatar.jpg';
import "./ProfilePage.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import TopicRow from '../CategoryView/TopicRow/TopicRow'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function ProfilePage() {

  
function createData(title, content, author, date, replies, rating,comments) {
  return {title, content, author, date, replies, rating,comments };
}

const rows = [
  createData( "Are we ever going to see Just Cause 5?"," YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.YEAH I SAID IT! I don't know how much longer it's gonna take but i can't take it anymore. This game is just AMAZING! And now what? we prob won't see it again.", "thrills3eker101","31.05/2021", 67, 81),
  createData( "WoW retri paladin build","IT's just the best i no.", "RetriOverProt", "8/08/2022",49, 3),
  createData( "Where to go after final boss","Now i have no life...HALP ", "justLost", "8/11/2022",13, 21),
  createData( "Best gaming moust for CS GO","Issi worth spending 200 dollers on am mouse", "DumbAi", "3/08/2022",9, 9),
];



  return (
    <div className="profileContainer">
      <div className="profileBackground">
        <img src={background} alt="background"></img>
      </div>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
          backgroundColor: "white",
          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          marginTop: "2rem",
          marginBottom: "2rem",
          paddingBottom: "1rem",
        }}
      >
          <div className="profileRow">

            <img src={avatar} alt="avatar" className="avatar"></img><EditIcon />
          </div>
         
            <h1>Mr. AdminButNotReallyAdminGuy</h1>
            <h3>This is my super awesome description that i can also change <EditIcon /></h3>
            
            <h1>My Posts:</h1>
            <div className="profilePosts">
      {rows.map((row) => (
      <Grid sx={{marginTop: "0.5rem", display: "flex", flexDirection: "row"}} >         
       <TopicRow row={row}/>
       <div className="topicEditDelete"><EditIcon /> <DeleteForeverIcon /> </div>
        
      </Grid>
     ))}
     </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
