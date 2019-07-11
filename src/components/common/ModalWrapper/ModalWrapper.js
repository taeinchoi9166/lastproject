import React,{Component} from 'react';

const ModalWrapper = ({children}) => {
    return(
      <div className="modal">
          {children}
      </div>
    );
};

export default ModalWrapper;