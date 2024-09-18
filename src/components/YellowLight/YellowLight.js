import React from 'react';

const YellowLight = (props) => {

  const {active, timer} = props

  return (
    <div className={`light yellow ${active ? 'active' : ''}`}>
    {active && <p>{timer}</p>}
  </div>

  )
};
export default YellowLight;
