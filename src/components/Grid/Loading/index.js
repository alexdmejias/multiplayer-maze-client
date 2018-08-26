import React from 'react';

const loadingStyles = {
  background: 'black',
  opacity: 0,
  transition: 'opacity 300ms',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const Loading = () => (
  <div className={'fill'} style={loadingStyles}>
    <p style={{color: 'white'}}>Waiting for next round to begin</p>
  </div>
);
