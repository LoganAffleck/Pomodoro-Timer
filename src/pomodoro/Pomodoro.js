import React, { useState } from "react";
import useInterval from "../utils/useInterval";


//import Components
import TimerControls from './components/TimerControls'
import ActiveSession from './components/ActiveSession'
import PlayPauseStop from './components/PlayPauseStop'

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */


function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {


  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

//Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 100 : null
  );



  const handleButtonPress = (event) => {
    let buttonName = event.target.id
    if (!isTimerRunning){
    switch (buttonName) {
      case 'increase-focus': setFocusDuration(Math.min(60, focusDuration + 5)); break;
      case 'decrease-focus': setFocusDuration(Math.max(5, focusDuration - 5)); break;
      case 'increase-break': setBreakDuration(Math.min(15, breakDuration + 1)); break;
      case 'decrease-break': setBreakDuration(Math.max(1, breakDuration - 1)); break;
      default: throw new Error('The clicked item lacks an ID or is not a increase/decrease button');
    } 
  };
  }



  return (
    <>

    {/*componenet controls timer values before starting the timer*/}
      <TimerControls 
      focusDuration = {focusDuration}
      breakDuration = {breakDuration}
      handleButtonPress = {handleButtonPress}
      session = {session}
      />

      {/*componenet has play/pause/stop buttons and controls the current state*/}
      <PlayPauseStop
      isTimerRunning = {isTimerRunning}
      setIsTimerRunning = {setIsTimerRunning}
      session = {session}
      setSession = {setSession}
      focusDuration = {focusDuration}
      />

    {/*componenet displays progress of the current session*/}
      <ActiveSession 
       isTimerRunning = {isTimerRunning}
       session = {session}
       focusDuration = {focusDuration}
       breakDuration = {breakDuration}
      />

      </>
  )
}

export default Pomodoro;
