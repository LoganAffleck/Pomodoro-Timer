import React from "react";
import {minutesToDuration} from "../../utils/duration";

const TimerControls = ({
  //Props Go Here...
  focusDuration,
  breakDuration, 
  handleButtonPress,
  session 
}) => {

    return(
        <div className="row" id='setTimers'>
        <div className="col">
          <div className="input-group input-group-lg mb-2">

            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>

            <div className="input-group-append">
             
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                id="decrease-focus"
                onClick={handleButtonPress}
                disabled = {focusDuration === 5 || session}
              >
                <span className="oi oi-minus" id="decrease-focus" onClick={handleButtonPress}/>
              </button>
              
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                id="increase-focus"
                onClick={handleButtonPress}
                disabled = {focusDuration === 60 || session}
              >
                <span className="oi oi-plus" id="increase-focus" onClick={handleButtonPress}/>
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {minutesToDuration(breakDuration)}
              </span>

              <div className="input-group-append">
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  id="decrease-break"
                  onClick={handleButtonPress}
                  disabled = {breakDuration === 1 || session}
                  
                >
                  <span className="oi oi-minus" id="decrease-break" onClick={handleButtonPress} />
                </button>


                
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  id="increase-break"
                  onClick={handleButtonPress}
                  disabled = {breakDuration === 15 || session}
                >
                  <span className="oi oi-plus" id="increase-break" onClick={handleButtonPress}/>
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>
    )

}


export default TimerControls