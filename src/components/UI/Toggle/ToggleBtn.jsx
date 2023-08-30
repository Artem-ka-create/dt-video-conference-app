import React from 'react'
import styles from './ToggleBtn.module.css';


function ToggleBtn({toggleBtnChange}) {


  return (
    
    <label className={styles.switch}>
        <input onChange={ (e)=> toggleBtnChange(e.target.checked) } type="checkbox"/>
        <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  )
}

export default ToggleBtn