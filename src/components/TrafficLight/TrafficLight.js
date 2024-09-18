// import React, { useContext, useEffect } from "react";
// import { TrafficContext } from "../TrafficContext/TrafficContext";
// import GreenLight from "../GreenLight/GreenLight";
// import YellowLight from "../YellowLight/YellowLight";
// import RedLight from "../RedLight/RedLight";
// import PedestrianButton from "../PedestrianButton/PedestrianButton";
// import EmergencyButton from "../EmergencyButton/EmergencyButton";

// import "./index.css";

// const TrafficLight = () => {
//   const { state, dispatch } = useContext(TrafficContext);

//   useEffect(() => {
//     let timer;
//     if (!state.emergencyOverride) {
//       timer = setTimeout(() => {
//         switch (state.currentLight) {
//           case "green":
//             dispatch({
//               type: "CHANGE_LIGHT",
//               payload: { light: "yellow", timer: 3 },
//             });
//             break;
//           case "yellow":
//             dispatch({
//               type: "CHANGE_LIGHT",
//               payload: { light: "red", timer: 7 },
//             });
//             break;
//           case "red":
//             if (state.pedestrianRequested) {
//               dispatch({ type: "REQUEST_CROSSING" });
//               setTimeout(() => {
//                 dispatch({
//                   type: "CHANGE_LIGHT",
//                   payload: { light: "green", timer: 10 },
//                 });
//               }, 5000);
//             } else {
//               dispatch({
//                 type: "CHANGE_LIGHT",
//                 payload: { light: "green", timer: 10 },
//               });
//             }
//             break;
//           default:
//             break;
//         }
//       }, state.timer * 1000);
//     }

//     return () => clearTimeout(timer);
//   }, [
//     state.currentLight,
//     state.pedestrianRequested,
//     state.emergencyOverride,
//     dispatch,
//     state.timer,
//   ]);

//   return (
//     <div className="traffic-light">
//       <div className="lights-container">
//         <GreenLight
//           active={state.currentLight === "green"}
//           timer={state.timer}
//         />
//         <YellowLight
//           active={state.currentLight === "yellow"}
//           timer={state.timer}
//         />
//         <RedLight active={state.currentLight === "red"} timer={state.timer} />
//       </div>
//       <PedestrianButton />
//       <EmergencyButton />
//     </div>
//   );
// };

// export default TrafficLight;

import React, { useContext, useEffect, useState } from "react";
import { TrafficContext } from "../TrafficContext/TrafficContext";
import GreenLight from "../GreenLight/GreenLight";
import YellowLight from "../YellowLight/YellowLight";
import RedLight from "../RedLight/RedLight";
import PedestrianButton from "../PedestrianButton/PedestrianButton";
import EmergencyButton from "../EmergencyButton/EmergencyButton";

import "./index.css";

const TrafficLight = () => {
  const { state, dispatch } = useContext(TrafficContext);
  const [countdown, setCountdown] = useState(state.timer); // local countdown state

  useEffect(() => {
    setCountdown(state.timer); // Reset countdown when light changes
    let timer;
    let interval;

    if (!state.emergencyOverride) {
      // Start countdown interval
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 1) {
            return prevCountdown - 1; // Decrement countdown each second
          } else {
            return 0; // Stop at 0
          }
        });
      }, 1000);

      // Handle light change when the timer ends
      timer = setTimeout(() => {
        switch (state.currentLight) {
          case "green":
            dispatch({
              type: "CHANGE_LIGHT",
              payload: { light: "yellow", timer: 3 },
            });
            break;
          case "yellow":
            dispatch({
              type: "CHANGE_LIGHT",
              payload: { light: "red", timer: 7 },
            });
            break;
          case "red":
            if (state.pedestrianRequested) {
              dispatch({ type: "REQUEST_CROSSING" });
              setTimeout(() => {
                dispatch({
                  type: "CHANGE_LIGHT",
                  payload: { light: "green", timer: 10 },
                });
              }, 5000);
            } else {
              dispatch({
                type: "CHANGE_LIGHT",
                payload: { light: "green", timer: 10 },
              });
            }
            break;
          default:
            break;
        }
      }, state.timer * 1000);
    }

    // Clean up the interval and timeout when the component unmounts or dependencies change
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [
    state.currentLight,
    state.pedestrianRequested,
    state.emergencyOverride,
    dispatch,
    state.timer,
  ]);

  return (
    <div className="traffic-light">
      <div className="lights-container">
        <GreenLight
          active={state.currentLight === "green"}
          timer={countdown} // Use countdown for dynamic display
        />
        <YellowLight
          active={state.currentLight === "yellow"}
          timer={countdown} // Use countdown for dynamic display
        />
        <RedLight active={state.currentLight === "red"} timer={countdown} />
      </div>
      <PedestrianButton />
      <EmergencyButton />
    </div>
  );
};

export default TrafficLight;
