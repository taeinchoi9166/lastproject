import request from 'request';
const GBA = require("gbajs");
const converter = require('./lib/util/converter');
// import a from './../assets/puyo_pop.gba';

export let init = async (canvas) => {
    let simul = new GBA();
    let bios;

    simul.logLevel = simul.LOG_ERROR;
    try{
        await request.get('http://localhost:4000/bios',(err,response,data)=>{
            if(err) console.log(err);
            bios = converter.convertBufferToArrayBuffer(JSON.parse(data));
            console.log(bios);
            simul.setBios(bios);
            simul.setCanvasMemory();
            simul.setCanvas(canvas);
        });

        await request.get('http://localhost:4000/game', (err,response,data)=>{
            if(err) console.log(err);
            let rom = converter.convertBufferToArrayBuffer(JSON.parse(data));
            let isSuccess = simul.setRom(rom);
            if(isSuccess){
                console.log("running...");
                simul.runStable();

                console.log(simul.video.context.canvas.toDataURL('image/png'));
                setTimeout(()=>{
                    console.log(simul.targetCanvas.toDataURL('image/png'));
                },1000);
            }else{
                process.exit(1);
            }
        })
    }catch(exception){
        console.error(exception);
    }



    let i = 0;
    // setInterval(()=>{
    //     const keypad = simul.keypad;
    //     keypad.press(keypad.A);
    //     const image = simul.screenshot()
    //     image.pack().pipe(createWriteStream(i+'screen.png'))
    // },1000);
};