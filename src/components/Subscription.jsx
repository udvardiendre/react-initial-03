import React from "react";

import { useState } from "react";
import axios from "axios";
import LoadingMask from "./LoadingMask";

function Subscription({subscriptionIsVisible}){

  const [valid, setValid] = useState(true)
  const [displayOfWarn, setDisplayOfWarn] = useState("none")
  const [emailAddress, setEmailAddress]= useState("")
  const [displayOfFormFields, setDisplayOfFormFields] = useState("initial")
  const [displayOfLoading, setDisplayOfLoading] = useState("none")
  const [messageVisisbility, setMessageVisibility] = useState("none")

  const validate = (e) => {
    const email = e.target.value
    let counter = 0

    for(const letter of email){
      if(letter === "@"){
        counter = counter + 1
      }else if (letter === "."){
        counter = counter + 1
      }else{
        setDisplayOfWarn("initial")
      }
    }

    if(counter === 2){
      setValid(false)
      setDisplayOfWarn("none")
      setEmailAddress(email)
    }else{
      setValid(true)
    }
  }

  const sendToEndPoint = async () => {
    let emailObject = {
      "email" : emailAddress
    }
    setDisplayOfFormFields("none")
    setDisplayOfLoading("initial")

    const response = await axios.post("https://seriescharacters.com/api/newsletter", emailObject)
    
    setDisplayOfLoading("none")
    setMessageVisibility("initial")

    setTimeout(() => subscriptionIsVisible(), 5000)
    console.log(emailObject)

    
  }

  return(
  <div>
    <form>
      <h2>Subscribe to our newsletter!</h2>
      <div style={{display: displayOfLoading}}>
        <LoadingMask/>
      </div>
      <h3 style={{display: messageVisisbility}}>Subscribed!</h3>
      <input style={{display: displayOfFormFields}} onChange={(e) => validate(e)} type="email" />
      <p style={{display: displayOfWarn}}>The email adress must contain a @ and a . eg.:example@domain.com</p>
      <button type="button" style={{display: displayOfFormFields}} disabled={valid} onClick={sendToEndPoint}>Subscribe</button>
    </form>
  </div>
  )
}

export default Subscription;