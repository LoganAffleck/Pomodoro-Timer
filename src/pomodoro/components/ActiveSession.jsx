import React from "react";
import {minutesToDuration} from "../../utils/duration";
import {secondsToDuration} from "../../utils/duration"


const ActiveSession = ({
    //Props Go Here...
    session,
    focusDuration,
    breakDuration 
}) => {

const determineTime = () => { 
if (session?.label === 'Focusing'){
  return focusDuration
} else return breakDuration
}

  let currentDuration = determineTime()
  let progress = 100 - (Math.abs(100 * session?.timeRemaining / (currentDuration*60)))
 
  

    return ( session &&

        <div id='activeSession'>

       
        <div className="row mb-2">
          <div className="col">
           
            <h2 data-testid="session-title">
              {session?.label} for {minutesToDuration(determineTime())} minutes
            </h2>

            <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session?.timeRemaining)} remaining 
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
                style={{ width: `${progress}%`}} 
              />
              
            </div>
          </div>
        </div>
      </div>
    

    )
}

export default ActiveSession