import React from 'react';

const RedLight = (props) => {

  const {active, timer} = props

  return (
    <div className={`light red ${active ? 'active' : ''}`}>
    {active && <p>{timer}</p>}
  </div>

  )
};
export default RedLight;
