import request from 'request';
const GBA = require("gbajs");
const converter = require('./lib/util/converter');

export const init = (canvas,file) => {
    let simul = new GBA();

    const fr = new FileReader();
    simul.setCanvasMemory();
    simul.setCanvas(canvas);

    return new Promise(async resolve => {
        simul.logLevel = simul.LOG_ERROR;

        // await request.get('http://localhost:4000/bios',(err,response,data)=>{
        //         if(err) console.log(err);
        //         let bios = converter.convertBufferToArrayBuffer(JSON.parse(data));
        //         console.log(bios);
        //         simul.setBios(bios);
        //
        //         resolve(simul);
        //     });
        fr.addEventListener("load",()=>{
            let bios = fr.result;
            console.log(bios);

            simul.setBios(bios);
            console.log("setting");
            simul.setCanvas(canvas);
            simul.setCanvasMemory();

            resolve(simul);
        });
        fr.readAsArrayBuffer(file);
    });
};

export const setGame = (simul,file) => {

    return new Promise(async resolve => {
        await request.get('http://localhost:4000/game', (err,response,data)=>{
            if(err) console.log(err);
            console.log(data);
            let rom = converter.convertBufferToArrayBuffer(JSON.parse(data));
            let isSuccess = simul.setRom(rom);
            resolve(simul);
        })
    });
}