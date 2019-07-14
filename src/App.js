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
        simul: null,
        isRomLoaded: false,
        time: 0,
        canvas: null,
        isPaused:false
    }

    componentDidMount() {
        const canvas = document.getElementById("canvas");
        let simul = new GBA();

        getBios().then((data)=>{
            const bios = convertBufferToArrayBuffer(data);
            simul.setBios(bios);
            simul.setCanvas(canvas);
            simul.setCanvasMemory();

            window.addEventListener("keydown",(e)=>{
                //simul.keypad.keydown(e.keyCode)

                let toggle = e.keyCode;
                // toggle = 1 << toggle;
                // simul.keypad.currentDown &= ~toggle;
                // simul.keypad.currentDown |= toggle;
                simul.keypad.keyboardHandler(e);
                // console.log("arrow")
                // if(toggle<=40&&toggle>=37){
                //    // simul.keypad.keydown(toggle);
                //     simul.keypad.keyboardHandler(e);
                // }else{
                //     simul.keypad.press(toggle,10);
                // }
             //   console.log(simul.keypad.currentDown)
            })
            window.addEventListener("keyup",(e)=>{
                simul.keypad.keyup(e.keyCode)
                //let toggle = e.keyCode;
                // simul.keypad.currentDown= 0x03FF;
                // simul.keypad.currentDown &= ~toggle;
                // simul.keypad.currentDown |= toggle;
              //  console.log(simul.keypad.currentDown)
            })
        })

        this.setState({
            ...this.state,
            canvas:canvas,
            simul:simul
        });
    }



  loadRom = (e) => {
        console.log("load");
        const simul = this.state.simul;
      const name = e.target.innerText;
      console.log(name);

      getRom(name).then((data)=>{
          console.log("eee");
          let rom = convertBufferToArrayBuffer(data);
          try{
              simul.setRom(rom);
              console.log(simul)
              simul.runStable();
          }catch(exception){
              console.error(exception);
          }

          this.setState({
              ...this.state,
              time:0
          });


           this.renderOnCanvas();
           this.countTimer();
      });
  }

  loadSaveFile = (e) => {
       //  const file = e.target.files[0];
       // // let fr = new FileReader();
       //  console.log(file);
       // fr.addEventListener("load",()=>{
            // const data = fr.result;
            // console.log(data);
            // const buffer = convertArrayBufferToBuffer(data);
            //  const simul = this.state.simul;
            // //console.log(simul.retrieveSavedata())
            //  simul.storeSavedata();
            //  setTimeout(()=>{
            //      simul.retrieveSavedata();
            //  },2000);
             //console.log(simul.retrieveSavedata())
            // console.log(simul.mmu)
            // try{
            //     simul.reset();
            //     simul.setSavedata(simul.mmu.memory);
            //     simul.runStable();
            // }catch(exception){
            //     console.error(exception);
            // }

        //});

        //fr.readAsArrayBuffer(file);


  }

  getSaveFile = () => {
        const simul = this.state.simul;
        const sram = simul.mmu.save;

        const data = Buffer.from(sram.buffer);
        //const saveData = simul;
        console.log(data);

        simul.downloadSavedata();

        setTimeout(()=>{
            simul.setSavedata(data);
        },2000)
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
    setInterval(()=>{
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
          const data = simul.screenshot().pack().data;
          // console.log(data);
          const blob = new Blob([simul.context.pixelData.data],{type:'image/png'});
          const url = URL.createObjectURL(blob);
          //const img = document.getElementById("image");
          //img.src = url;
          //window.open(url);

          const dataArray = Array.from(data);
          const imageData = ctx.getImageData(0,0,240,160);

          //console.log(dataArray);
          ctx.clearRect(0,0,240,160)
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
                <button className="pause-btn" onClick={this.togglePause}>중지</button>
                <Timer time={this.state.time}/>
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
