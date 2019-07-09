import fs from 'fs';
const GBA = require("gbajs");

export let init = (canvas) => {
    let simul = new GBA();
    const {readFile,readFileSync,createWriteStream} = require('fs');

    const rom = fs.readFile("./src/puyo_pop.gba",(err,data)=>{
        console.log(data);
    });

    const bios = readFileSync('./node_modules/gbajs/resources/bios.bin');
    simul.setBios(bios);
    simul.setCanvasMemory();
   // simul.setCanvas(canvas);

    simul.loadRomFromFile('./src/puyo_pop.gba',(err,res) => {
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log(res);
        simul.runStable();
    })

    let i = 0;
    setInterval(()=>{
        const keypad = simul.keypad;
        keypad.press(keypad.A);
        const image = simul.screenshot()
        image.pack().pipe(createWriteStream(i+'screen.png'))
    },1000);
};