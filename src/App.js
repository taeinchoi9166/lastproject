import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {init} from './test';
import fs from 'fs';

class App extends Component{
  initalize = async () => {
    const canvas = document.getElementById("canvas");
    await init(canvas);


  }

  render(){
    return (
        <div className="App" onClick={this.initalize}>
          <header className="App-header">
           <canvas id="canvas" width="480" height="320"></canvas>
          </header>

        </div>
    );
  }

}

export default App;
