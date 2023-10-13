import React from 'react'
import styles from './SubmitButton.module.css'

function SimpleButton({ hadleButtonFunction, btnText }) {
  return (
    <button className={styles.submit_button} onClick={hadleButtonFunction} >{btnText}</button>
  )
}

export default SimpleButton;