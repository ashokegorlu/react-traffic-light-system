import React from 'react';

const GreenLight = (props) => {

  const {active, timer} = props

  return (
    <div className={`light green ${active ? 'active' : ''}`}>
    {active && <p>{timer}</p>}
  </div>

  )
};
export default GreenLight;
