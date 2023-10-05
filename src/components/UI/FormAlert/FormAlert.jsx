import React from 'react'
import styles from './FormAlert.module.css'

function FormAlert({exceptionStatus, exceptionText}) {

    

  return (

    <div className={`${styles.alert_box} ${exceptionStatus ? styles.open : styles.close}`}>
      {exceptionText}    
    </div>
  )
}

export default FormAlert;