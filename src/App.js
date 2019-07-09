import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {init} from './test';
import fs from 'fs';

class App extends Component{
  initalize = () => {
    const canvas = document.getElementById("canvas");
    //init(canvas);
    fs.readFileSync("./index.js");
  }

  render(){
    return (
        <div className="App" onClick={this.initalize}>
          <header className="App-header">
           <canvas id="canvas" width="500" height="400"></canvas>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>

        </div>
    );
  }

}

export default App;
