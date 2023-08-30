import React from 'react'
import styles from './ToggleBtn.module.css';
function ToggleBtn() {
  return (
    <>
    <label className={styles.switch}>
        <input type="checkbox"/>
        <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
    </>
  )
}

export default ToggleBtn