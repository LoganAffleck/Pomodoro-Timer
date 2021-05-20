import React, { useState } from "react";
import classNames from "../../utils/class-names";


const PlayPauseStop = ({
    //Props Go Here...
    isTimerRunning,
    setIsTimerRunning,
    session,
    setSession,
    focusDuration,
}) => {

  /**
   * Called whenever the play/pause button is clicked.
   */
   function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }


    return (
        <div className="row" id='playPauseButtons'>
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              disabled = {!session}
              onClick = {() => {
                setIsTimerRunning(false);
                setSession(null);
              }}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
    );
}

export default PlayPauseStop