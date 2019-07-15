import React,{Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Header} from './components/common/Header';
import {RomList} from "./components/rom/RomList";
import {Timer} from './components/timer/Timer';

import GBA from 'gbajs';
import {getRom, getBios} from './lib/api/api';
import {convertBufferToArrayBuffer} from './lib/util/converter';


class App extends Component{
    state = {
        simul: null, // GBA 객체
        isRomLoaded: false, //롬 로딩 여부
        time: 0, //진행 시간
        canvas: null, //캔버스 DOM
        isPaused:false, // 중지 버튼 누름 여부
        nowGame:"" // 현재 진행중인 게임명
    }

    componentDidMount() {
        const canvas = document.getElementById("canvas");
        let simul = new GBA();

        getBios().then((data)=>{ //롬 로딩
            const bios = convertBufferToArrayBuffer(data);
            simul.setBios(bios);
            simul.setCanvas(canvas);
            simul.setCanvasMemory();


            //키 설정
            // 현재 동시에 키를 눌렀다 한쪽만 뗐을 떄 나머지 키 하나가 안먹는 오류 발생
            window.addEventListener("keydown",(e)=>{
                 simul.keypad.keyboardHandler(e);
            })
            window.addEventListener("keyup",(e)=>{
                 simul.keypad.currentDown= 0x03FF;
            })
        })

        this.setState({ //실행시킨 시뮬레이터 저장
            ...this.state,
            canvas:canvas,
            simul:simul
        });
    }



  loadRom = (e) => { //롬 로딩 - ROMList 컴포넌트에 전달
      const simul = this.state.simul;
      const name = e.target.innerText;

      getRom(name).then((data)=>{ //롬 받기
          let rom = convertBufferToArrayBuffer(data);
          try{
              simul.setRom(rom);
              simul.runStable();
          }catch(exception){
              console.error(exception);
          }

          this.setState({
              ...this.state,
              time:0,
              nowGame:name,
              isPaused:false
          });


           this.renderOnCanvas(); //랜더링
           this.countTimer(); //시간 증가
      });
  }


  togglePause = () => {
        const isPaused = !this.state.isPaused
        this.setState({
            ...this.state,
            isPaused:isPaused
        });
        if(isPaused){
            this.state.simul.pause();
        }else{
            this.state.simul.runStable();
        }
  }

  countTimer = () => {
    const self = this;
    setInterval(()=>{ // 0.01초 간격으로 1씩 증가
        if(!this.state.isPaused) {
            this.setState({
                ...this.state,
                time: this.state.time + 1
            });
        }
     },10);
  }

  renderOnCanvas = () => {
        const [ctx, simul] = [this.state.canvas.getContext("2d"), this.state.simul];

      setInterval(()=>{
          const data = simul.screenshot().pack().data; //이미지 Buffer 가져옴
          // console.log(data);
          const blob = new Blob([simul.context.pixelData.data],{type:'image/png'});
          const url = URL.createObjectURL(blob);

          const dataArray = Array.from(data);
          const imageData = ctx.getImageData(0,0,240,160);

          if(this.state.time%400 === 0){
              ctx.clearRect(0,0,240,160);
              console.log("clear!");
          }
          for(let i = 0; i < 240* 160* 4; i+=4){
              imageData.data[i] = dataArray[i];
              imageData.data[i+1] = dataArray[i+1];
              imageData.data[i+2] = dataArray[i+2];
              imageData.data[i+3] = 255;

          }
          ctx.putImageData(imageData,0,0);

      },4);
  }

  render(){
    return (
        <Fragment>
            <Header/>
            <section>
                <div className="canvas-wrap">
                    <canvas id="canvas" width="240" height="160"></canvas>
                </div>
                <button className="pause-btn" onClick={this.togglePause}>{this.state.isPaused ? "계속하기" : "중지하기"}</button>
                <Timer time={this.state.time} nowGame={this.state.nowGame}/>
            </section>
            <aside>
                <RomList onLoadGame={this.loadRom}/>
            </aside>
            <div className="help">
                <ul>
                    <li>방향키 : 십자키</li>
                    <li>z키 : A</li>
                    <li>x키 : B</li>
                    <li>a키 : L</li>
                    <li>s키 : R</li>
                    <li>enter : Start</li>
                    <li>\ : Select</li>
                </ul>
            </div>
        </Fragment>
    );
  }

}

export default App;
