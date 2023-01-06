import StartChat from "./startChat";
import "./dashboard.css";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import Stream from "./stream";
import Playback from "./playback";
import Header from "./header";
function Dashboard() {
  const client = createReactClient({
    provider: studioProvider({
      apiKey: "b0852484-7639-4a7f-b56f-cf132aad31f3",
    }),
  });
  return (
    <div>
      <h1 className="dashobard-hero-text">Start Your adventure</h1>
      {/* <StartChat/> */}
      <LivepeerConfig client={client}>
        <Header />
        <Stream />
        {/* <Playback /> */}
      </LivepeerConfig>
    </div>
  );
}

export default Dashboard;
