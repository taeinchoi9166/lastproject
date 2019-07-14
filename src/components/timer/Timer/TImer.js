import React,{Component} from 'react';
import './Timer.scss';

class Timer extends Component{
    render(){
        const time = this.props.time;
        return(
          <div className="timer">
              {parseInt((time/30)/(60))+" : "+parseInt((time/30)%60)}
          </div>
        );
    }
}

export default Timer;