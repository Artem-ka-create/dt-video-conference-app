
import React,{useState} from 'react';
import styles from './Input.module.css'
import FormAlert from '../FormAlert/FormAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function SecretInput({labelText,entity,value, setInput, Data, handleFunction,type, privacyStatus,setPrivacyStatus }) { 


   
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
            <div className={styles.labelContainer}>
                <label htmlFor={entity}>{labelText}</label> 
                <div className={styles.securityLabelBtn} type='submit'  onClick={()=>setPrivacyStatus(!privacyStatus)}>
                    show {type} 
                    <FontAwesomeIcon icon={privacyStatus ? faEyeSlash : faEye }/> 
                </div>
            </div>
            {/* <input placeholder={`Input ${labelText} ...` }  id={entity} value={value} onChange={(event)=> handleInputText(event.target.value) } type='text' /> */}
            <input placeholder={`Input ${labelText} ...` }  id={entity} value={value} 
            onChange={(event)=> handleInputText(event.target.value) } 
            // type={privacyStatus}
            type = { privacyStatus ? type : 'text'}
            />

            <FormAlert exceptionStatus={exceptionStatus} exceptionText={exception}/>
        </div>
  )
}

export default SecretInput;