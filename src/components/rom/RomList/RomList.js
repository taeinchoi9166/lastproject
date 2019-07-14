import React, {Component} from 'react';
import './RomList.scss';

import {getRomList,getRom} from '../../../lib/api/api';
import {convertBufferToArrayBuffer} from '../../../lib/util/converter';

class RomList extends Component{
    state = {
        romList:[]
    }

    componentDidMount() {
        getRomList().then((data)=>{
            this.setState({
                ...this.state,
                romList:data
            })
        })
    }

    selectRom = (e) => {
        const name = e.target.text;
        getRom(name).then((data)=>{
            const rom = convertBufferToArrayBuffer(data);

        })
    }

    render(){
        return(
          <div className="rom-list">
              <ul>
                  {this.state.romList.map((item)=>(<li onClick={this.props.onLoadGame}>{item}</li>))}
              </ul>
          </div>
        );
    }
};

export default RomList;