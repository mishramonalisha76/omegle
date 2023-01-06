import { useState, useRef } from "react";
import { Player } from "@livepeer/react";

const Playback = (props) => {

  return (
    <div className="Stream">
      <div className="Stream-video" style={{ color: "white" }}>
        {true ? (
          <Player
            title="Incoming Video"
            playbackId={props.playBackId.playbackId}
            showPipButton
          />
        ) : (
          <>No match so far.</>
        )}
      </div>
    </div>
  );
};

export default Playback;
