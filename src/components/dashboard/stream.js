import React, { useEffect, useRef, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import Playback from "./playback";
import axios from "axios";
const BACKEND_REGISTER_URL = "http://localhost:4000/apis/v1/add/";
const BACKEND_MATCH_URL = "http://localhost:4000/apis/v1/match/";
const Stream = () => {
  const inputEl = useRef(null);
  const playbackEl = useRef(null);
  const videoEl = useRef(null);
  const stream = useRef(null);
  const [match, setMatch] = useState(null);
  const [matchKeys, setMatchKeys] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(0);

  useEffect(() => {
    (async () => {
      videoEl.current.volume = 0;

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  });

  const initiateStreamHandler = async () => {
    const streamKey = inputEl.current.value;
    const playbackId = playbackEl.current.value;

    // call api to register
    await axios.post(BACKEND_REGISTER_URL, {
      user: "0x5913760160d245d0C9A05a8a956012694281bEE3",
      mode: 1,
      streamLink: streamKey,
      playbackId: playbackId,
    });

    // call api to get matches
    const matches = await axios.get(BACKEND_MATCH_URL);
    setMatch(matches.data);
    setMatchKeys(Object.keys(matches.data));
    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  const getNextMatch = () => {
    if (currentMatch < matchKeys.length) setCurrentMatch(currentMatch+1);
  };
  return (
    <div className="Stream">
      <input
        className="Stream-input"
        ref={inputEl}
        type="text"
        placeholder="Stream key"
      />
      <input
        className="Stream-input"
        ref={playbackEl}
        type="text"
        placeholder="Playback Id"
      />
      Your video
      <video className="Stream-video" ref={videoEl} />
      <button className="Stream-button" onClick={initiateStreamHandler}>
        Get Your Match
      </button>
      {playbackEl.current ? (
        <div>
          <Playback playBackId={match[matchKeys[currentMatch]]} />
          <button className="Stream-button" onClick={getNextMatch}>
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Stream;
