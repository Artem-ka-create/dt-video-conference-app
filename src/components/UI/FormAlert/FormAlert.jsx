import React from 'react'
import styles from './FormAlert.module.css'

function FormAlert({exceptionStatus}) {

    

  return (

    <div className={`${styles.alert_box} ${exceptionStatus ? styles.open : styles.close}`}>
        
        <div className={styles.exception_block}>
          password is required
        </div>
        <div className={styles.exception_block}>
          conferention id is required
        </div>
        
    </div>
  )
}

export default FormAlert;