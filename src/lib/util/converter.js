exports.convertBufferToArrayBuffer = (buffer) => { //Buffer 를 ArrayBuffer
    let ab = new ArrayBuffer(buffer.data.length);
    let arr = new Uint8Array(ab);
    for(let i = 0; i< buffer.data.length; i++){
        arr[i] = buffer.data[i];
    }
    return ab;
}

exports.convertArrayBufferToBuffer = (arraybuffer) => { //ArrayBuffer를 Buffer로
    let buffer = new Buffer(arraybuffer.byteLength);
    let arr = new Uint8Array(arraybuffer);
    for(let i = 0; i < buffer.length; i++){
        buffer[i] = arr[i];
    }
    return buffer;
}