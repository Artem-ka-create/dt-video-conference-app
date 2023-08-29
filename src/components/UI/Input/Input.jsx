/* eslint-disable */

import React from 'react'
import styles from './Input.module.css'

function Input({labelText,entity,value, setInput, Data}) {



  return (
    <>
        <label htmlFor={entity}>{labelText}</label>
        <input id={entity} value={value} onChange={(event)=> setInput({...Data, [entity] : event.target.value})} type='text' />
    </>
  )
}

export default Input