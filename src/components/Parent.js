import React, { useState } from 'react';
import Child from './Child';

function Parent() {
  const [data, setData] = useState('');
  const childToParent = (childdata) => {
    setData(childdata);
  };
  return (
    <div>
      Parent
      <Child childToParent={childToParent} />
      {data}
    </div>
  );
}

export default Parent;
