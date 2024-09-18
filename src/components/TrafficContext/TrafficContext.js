import React, { createContext, useReducer } from "react";

const TrafficContext = createContext();

const initialState = {
  currentLight: "green",
  pedestrianRequested: false,
  emergencyOverride: false,
  timer: 10,
};

const trafficReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LIGHT":
      return {
        ...state,
        currentLight: action.payload.light,
        timer: action.payload.timer,
      };
    case "REQUEST_CROSSING":
      return { ...state, pedestrianRequested: true };
    case "EMERGENCY_OVERRIDE":
      return { ...state, emergencyOverride: true, currentLight: "red" };
    default:
      return state;
  }
};

const TrafficProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficReducer, initialState);

  return (
    <TrafficContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficContext.Provider>
  );
};

export { TrafficContext, TrafficProvider };
