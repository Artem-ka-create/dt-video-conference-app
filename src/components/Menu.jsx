import React from 'react'
import styles from './Menu.module.css';
import {useNavigate} from 'react-router-dom';

import dt_logo from './UI/Logos/dt-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark , faArrowRight} from '@fortawesome/free-solid-svg-icons'

function Menu({panelStatus, onChangePanel}) {

    const navigate = useNavigate();

    const handleMoveToMain = () => navigate('/');
    const handleMoveToJoin = () => navigate('/join');
    const handleMoveToCreate = () => navigate('/create');
    const handleMoveToAbout = () => navigate('/about');

    const panelHandler = ()=> onChangePanel(!panelStatus);


  return (
    <>
    <div className={`${styles.panel} ${panelStatus ? styles.open : ''}`}>
       <div style={{display:'flex', alignItems:'center'}}>
        <img src={dt_logo} alt='dt-logo'/>
        <div className={`${styles.panel_text}`}>DT MEET</div>
        <button className={styles.closebtn} onClick={()=> panelHandler()} ><FontAwesomeIcon icon={faRectangleXmark} /></button>
       </div>
      

        <div className={styles.panelContainer}>
            
            <button onClick={handleMoveToMain} className={styles.panelButton}>Main</button>
            <button onClick={handleMoveToCreate} className={styles.panelButton}>Create Meeting</button>
            <button onClick={handleMoveToJoin} className={styles.panelButton}>Join To Meeting</button>
            <button onClick={handleMoveToAbout} className={styles.panelButton}>About</button>

        </div>
    </div>

    <button onClick={()=> panelHandler()} className={styles.openbtn}><div style={{marginRight:'10px'}}>Open panel </div><FontAwesomeIcon icon={faArrowRight} /></button>
    </>
  )
}

export default Menu