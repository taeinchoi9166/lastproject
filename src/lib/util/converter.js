exports.convertBufferToArrayBuffer = (buffer) => { //Buffer 를 ArrayBuffer
    let ab = new ArrayBuffer(buffer.data.length);
    let arr = new Uint8Array(ab);
    for(let i = 0; i< buffer.data.length; ++i){
        arr[i] = buffer.data[i];
    }
    return ab;
}