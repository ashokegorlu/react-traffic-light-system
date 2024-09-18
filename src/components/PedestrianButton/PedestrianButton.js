import React, { useContext } from 'react';
import { TrafficContext } from '../TrafficContext/TrafficContext';

import "./index.css"

const PedestrianButton = () => {
  const { dispatch, state } = useContext(TrafficContext);

  const handleRequest = () => {
    if (!state.pedestrianRequested) {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <button

    // ${state.pedestrianRequested ? 'pressed' : ''}
      className={`pedestrian-button`}  
      onClick={handleRequest}
      disabled={state.pedestrianRequested}
    >
      {state.pedestrianRequested ? 'Pedestrian Waiting...' : 'Request Crossing'}
    </button>
  );
};

export default PedestrianButton;
