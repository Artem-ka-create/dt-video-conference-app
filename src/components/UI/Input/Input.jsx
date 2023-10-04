/* eslint-disable */

import React from 'react'
import styles from './Input.module.css'
import FormAlert from '../FormAlert/FormAlert';


function Input({labelText,entity,value, setInput, Data}) {



  return (
    <>
        <label htmlFor={entity}>{labelText}</label>
        <input placeholder={`Input ${labelText} ...` }  id={entity} value={value} onChange={(event)=> setInput({...Data, [entity] : event.target.value})} type='text' />
        <FormAlert exceptionStatus={true}/>

    </>
  )
}

export default Input