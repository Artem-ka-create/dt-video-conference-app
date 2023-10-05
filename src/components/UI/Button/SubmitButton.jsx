
import React from 'react'
import styles from './SubmitButton.module.css';

function SubmitButton({btnDisabled}) {
  return (
    // className={`${styles.panel} ${panelStatus ? styles.open : ''}`}
    <button type='submit' disabled={btnDisabled} title="Submit"
    className={`${styles.submit_button} ${btnDisabled ? styles.disabled : ''}`} >Submit</button>
  )
}

export default SubmitButton