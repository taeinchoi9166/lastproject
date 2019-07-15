import React,{Component} from 'react';
import './Timer.scss';

class Timer extends Component{
    render(){
        const time = this.props.time;
        return(
          <div className="timer">
              <span>{this.props.nowGame.length > 20 ? this.props.nowGame.substring(0,16) + "..." : this.props.nowGame || "please select a game"}</span><br/>
              <div>{parseInt((time/30)/(60))+" : "+parseInt((time/30)%60)}</div>
          </div>
        );
    }
}

export default Timer;