import React from "react";
import "./ErrorCard.css";
const ErrorCard = (props) => {
    const btnHandler1 = ()  =>{
        'this true and other false'
        props.fn({btn1:true,btn2:false});
    }
    const btnHandler2 = ()  =>{
        props.fn({btn1:false,btn2:true});
    }
  return (
    <div className="error_main">
      <div className="error_body">
        <p> {props.details.message}</p>
        <section>
            {props.details.btn1[0] && (<button id="ER_btn1" onClick={btnHandler1}>{props.details.btn1[1]} </button>)}
            {props.details.btn2[0] &&(<button id="ER_btn2" onClick={btnHandler2}>{props.details.btn2[1]}</button>)}
            
        </section>
      </div>
    </div>
  );
};

export default ErrorCard;
