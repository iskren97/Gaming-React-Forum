import React, { useState, useEffect } from 'react';
import { ExpandLess } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './Scroll.css';

const Scroll = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div>
      {show && (
        <IconButton
          className="icon-btn"
          sx={{ backgroundColor: '#47DB00' }}
          onClick={handleClick}
          aria-label="to top"
          component="span"
        >
          <ExpandLess fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};
export default Scroll;
