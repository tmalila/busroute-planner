import React from 'react';
import logo from './logo.svg';
import './App.css';
import BusRoutePage from './BusRoutePage';
import reittiopas from './reittiopas.json';
import { Grid, makeStyles } from '@material-ui/core';

function App() {
  const busStops = reittiopas.pysakit;
  const busRoads = reittiopas.tiet;
  const busRoutes = reittiopas.linjastot;

  return (
    <div className="App">
      {/* <Grid container spacing={3}> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BusRoutePage busStops={busStops} busRoads={busRoads} busRoutes={busRoutes}></BusRoutePage>
      {/* </Grid> */}
    </div>
  );
}

export default App;
