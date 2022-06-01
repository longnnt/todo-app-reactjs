import React from 'react';

function Child({ childToParent }) {
  const data = 'This is data from Child';
  return (
    <div>
      <button onClick={() => childToParent(data)}>Click Child</button>
    </div>
  );
}

export default Child;
