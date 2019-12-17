import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Portis from "@portis/web3";
import Web3 from "web3";
import { TerminalHttpProvider, SourceType } from "@terminal-packages/sdk";

const portis = new Portis("PORTIS DEV ID", "maticAlpha");

const web3 = new Web3(
  new TerminalHttpProvider({
    apiKey: "API_KEY", /// ADD YOUR TERMINAL API KEY HERE
    projectId: "PROJECT_ID", /// ADD YOUR TERMINAL PROJECT ID HERE
    customHttpProvider: portis.provider,
    networkSource: "Matic",
    source: SourceType.Portis,
    host: portis.config.network.nodeUrl
  })
);

function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [acct, setAcct] = useState(null);

  const getBlockNumber = () => {
    web3.eth.getBlockNumber().then(res => setBlockNumber(res));
  };

  const sendTx = () => {
    web3.eth.getAccounts().then(accounts => {
      setAcct(accounts);
      web3.eth
        .sendTransaction({
          from: accounts[0],
          to: accounts[0],
          value: web3.utils.toWei("0")
        })
        .then(console.log);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>Matic Test</div>
        <button onClick={() => getBlockNumber()}>Get Block Number</button>
        <div>{`${blockNumber}`}</div>
        <button onClick={() => sendTx()}>Send Transaction</button>
        <div>{`${acct}`}</div>
      </header>
    </div>
  );
}

export default App;
