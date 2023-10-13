/* eslint-disable */

import React, { useState } from 'react'
import styles from './Input.module.css'
import FormAlert from '../FormAlert/FormAlert';


function Input({labelText,entity,value, setInput, Data, handleFunction,type }) {

  const [exception,SetExceptionText] = useState('');
  const [exceptionStatus,SetExceptionStatus] = useState(false);

  function handleInputText(text){
    
    setInput({...Data, [entity] : text });

    let handleResult = handleFunction(text, labelText);
 
    if (handleResult.length>0){
      SetExceptionText(handleResult);
      SetExceptionStatus(true);

    }else{
        SetExceptionStatus(false);
    }
    
  }


  return (
    <div style={{marginTop:'5px'}}>
        <label htmlFor={entity}>{labelText}</label> 
        {/* <input placeholder={`Input ${labelText} ...` }  id={entity} value={value} onChange={(event)=> handleInputText(event.target.value) } type='text' /> */}
        <input placeholder={`Input ${labelText} ...` }  id={entity} value={value} 
          onChange={(event)=> handleInputText(event.target.value) } 
          type={type}
        />

        <FormAlert exceptionStatus={exceptionStatus} exceptionText={exception}/>
    </div>
  )
}

export default Input