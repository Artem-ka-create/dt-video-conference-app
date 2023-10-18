import React, { useState } from 'react'
import styles from './Room.module.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear, faUser, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function Room() {

  const [showConfirmation,setShowConfirmation] = useState(false);
  const [showRoomDetails,setShowRoomDetails] = useState(false);


  const footer = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setShowConfirmation(false)} className="p-button-danger p-button-text" />
      <Button label="Yes" icon="pi pi-check"  className="p-button-danger" onClick={() => setShowConfirmation(false)} autoFocus />
    </div>
  )

  return (
    <div className={`${styles.itemBlock} ${styles.roomBlock}`}>
      <div className={`${styles.rowInfo}`}>
        <div>
          < FontAwesomeIcon icon={faUser} /> 5
        </div>
        < FontAwesomeIcon onClick={ () => setShowConfirmation(true) } className={styles.operationBtn} icon={faCircleXmark} />
      </div>
      <div className={styles.titleName}>
        Room123
      </div>
      <div className={`${styles.rowInfo}`}>
        <div>
          < FontAwesomeIcon icon={faVideo} /> 12
        </div>
        < FontAwesomeIcon className={styles.operationBtn} icon={faGear} onClick={()=> setShowRoomDetails(true)} />
      </div>

      <Dialog header="Room123" visible={showConfirmation} draggable={false} modal style={{ width: '40vw' }} footer={footer} onHide={() => setShowConfirmation(false)}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          <span className={styles.alertbtn}>Are you sure you want to delete this room</span>
        </div>
      </Dialog>

      <Dialog header="Header" draggable={false} visible={showRoomDetails} style={{ width: '90vw' , height:' 125.6vh'}}  onHide={() => setShowRoomDetails(false)}>
            <h1>ABOUT ROOM INFO</h1>
      </Dialog>
    </div>
  )
}

export default Room