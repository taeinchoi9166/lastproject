/*
    서버 API
* */
import request from 'request';

const host = "http://localhost:4000";

export const getRomList = () => { //서버의 롬 목록
    return new Promise(resolve => {
        request.get(host+"/games",(err,response,body)=>{
            resolve(JSON.parse(body));
        });
    });
}

export const getRom = (name) => { //이름으로 롬 가져오기
    return new Promise(resolve => {
       request.get(host+"/game/"+name,(err,response,body) => {
           resolve(JSON.parse(body));
       })
    });
}

export const getBios = () => { //설정파일 가져오기
    return new Promise(resolve => {
        request.get(host+"/bios",(err,response,body) => {
            resolve(JSON.parse(body));
        })
    });
}