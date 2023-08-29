
import React from 'react'
import styles from './SubmitButton.module.css';

function SubmitButton() {
  return (
    <button type='submit' title="Submit" className={styles.submit_button} >Submit</button>
  )
}

export default SubmitButton