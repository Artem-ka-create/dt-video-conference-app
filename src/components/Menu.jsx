import React ,{ useState }from 'react'
import styles from './Menu.module.css';
import {useNavigate} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark , faArrowRight} from '@fortawesome/free-solid-svg-icons'


function Menu() {

    const [openStatus, setOpenStatus] = useState(false);
    const navigate = useNavigate();

    const handleMoveToMain = () => navigate('/');
    const handleMoveToJoin = () => navigate('/join',{ state: { id: 7, color: 'green' } });
    const handleMoveToCreate = () => navigate('/create');
    const handleMoveToAbout = () => navigate('/about');

    const panelHandler = ()=> setOpenStatus(!openStatus);


  return (
    <>
    <div className={`${styles.panel} ${openStatus ? styles.open : ''}`}>

        <button className={styles.closebtn} onClick={()=> panelHandler()} ><FontAwesomeIcon icon={faRectangleXmark} /></button>
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