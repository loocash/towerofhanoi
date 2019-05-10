import React from 'react';

function Tower({plates = [], onClick, selected}) {
  return (
    <div className={`Tower ${selected ? 'selected' : ''}`} onClick={onClick}>
      {`[${plates.join(", ")}]`}
    </div>
  );
}

export default Tower;