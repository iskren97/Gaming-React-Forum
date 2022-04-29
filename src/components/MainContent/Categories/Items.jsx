import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.primary,
}));

const Items = ({ name, topic, logo }) => {
  return (
    <Item>
      <div className="category-preview">
        <div>
          <img className="general-img" src={logo} alt="img"></img>
        </div>
        <div className="category-info">
          <h2>{name}</h2>
          <p>Discuss everything about {topic}</p>
        </div>
      </div>
    </Item>
  );
};

export default Items;
