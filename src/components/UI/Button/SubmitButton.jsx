
import React from 'react'
import styles from './SubmitButton.module.css';

function SubmitButton({btnDisabled,btnText}) {
  return (
    // className={`${styles.panel} ${panelStatus ? styles.open : ''}`}
    <button type='submit' disabled={btnDisabled} title="Submit"
    className={`${styles.submit_button} ${btnDisabled ? styles.disabled : ''}`} >{btnText}</button>
  )
}

export default SubmitButton