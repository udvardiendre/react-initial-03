import React from "react";
import { useState } from "react";

function Character({name, details}) {

  const [btnTitle, setBtnTitle] = useState("Show more")
  const [displayStyle, setDisplayStyle] = useState("none")

  const showMoreOrLess = () =>{
    if(btnTitle === "Show more"){
      setBtnTitle("Show less")
      setDisplayStyle("initial")
    }else if(btnTitle === "Show less"){
      setBtnTitle("Show more")
      setDisplayStyle("none")
    }
  }

  return (
    <div>
      <h3>{name}</h3>
      <button onClick={showMoreOrLess}>{btnTitle}</button>
      <p style={{display: displayStyle}}>{details}</p>
    </div>
  );
}

export default Character;