import React from 'react';

function Tower({plates = [], onClick, selected}) {
  return (
    <div className={`Tower ${selected ? 'selected' : ''}`} onClick={onClick}>
      {
        plates.map(width => <div key={width} className="plate" style={{width: width*20}} />)
      }
    </div>
  );
}

export default Tower;