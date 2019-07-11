import React,{Component} from 'react';

class LoginModal extends Component{
    render(){
        return(
          <div className="login">
              <span className="modal-legend">아이디</span>
              <input type="text" id="uid" defaultValue="" value=""/>
              <span className="modal-legend">비번</span>
              <input type="password" id="upassword" defaultValue="" value=""/>
              <button className="login-btn">로그인</button>
          </div>
        );
    }
}

export default LoginModal;