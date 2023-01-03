import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./landing";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import StartChat from "./dashboard/startChat";


export default function RouterComponent() {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai,chain.goerli,chain.optimismGoerli],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/chat" element={<StartChat />} />
            </Routes>
          </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
