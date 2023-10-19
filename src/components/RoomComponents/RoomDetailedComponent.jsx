import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import styleRoom from './Room.module.css';
import styleCreateForm from '../Forms/CreateForm.module.css'
import styles from './RoomDetailedComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faVideo, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { RoomCategories } from '../../data/TechData';
import ToggleBtn from '../UI/Toggle/ToggleBtn';

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {UsersARR,MeetingsArray} from '../../data/testArrData'
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";


function RoomDetailedComponent() {
  const copyLinkIcon = <FontAwesomeIcon icon={faLink} />
  const startMeetingIcon = <FontAwesomeIcon icon={faVideo} />
  const joinMeetingIcon = <FontAwesomeIcon icon={faRightToBracket} />
  const [category, SetCategory] = useState(RoomCategories.UsersCategory);

  const [entities,SeteEtities] = useState(UsersARR);
  const running = true;

  useEffect(()=>{
    // productService.getProductsSmall().then((data) => SetProducts({ products: data }));
  },[])
  const handleUsersCategory = () => {
    SetCategory(RoomCategories.UsersCategory)
    SeteEtities(UsersARR);
    
  }
  const handleMeetingsCategory = () => {
    SetCategory(RoomCategories.MeetingsCategory)
    // SeteEtities(MeetingsArray);
  }
  const handleSettingsCategory = () => {
    SetCategory(RoomCategories.SettingsCategory)

  }
  function onToggleBtnHandle(event) {
    console.log(event);

  }


  return (
    <>
      {/* <div>RoomDetailedComponent</div> */}

      <div className={styles.headerContainer}>

        <div className={styles.roomInfo}>
          <div className={styles.naviContainer}>
            <div className={styles.roomName}>Room123</div>
            <div className={styles.btnContainer}>

              <Button label={running ? joinMeetingIcon : startMeetingIcon} className={`${styleRoom.dialogSaveBtnPrm} ${styles.startJoinBtn}`} />
              <Button label={copyLinkIcon} className={`${styleRoom.dialogCloseBtnPrm} ${styles.copyLinkBtn}`} outlined />
            </div>
          </div>
          { running ? <div className={styles.liveBox}>Live</div> : <div style={{ color: '#909090' }}>Last session, May 2023 at 10:31 AM</div>}
        </div>
        <hr className={styles.roomLine} />

        <div className={styles.optionContainer}>
          <div className={`${styles.navigationComponent} noselect`}>
            <div className={`${styles.naviItem}  ${category === RoomCategories.UsersCategory ? styles.selectedCategory : ''}`}
              onClick={handleUsersCategory}>
              Users
            </div>
            <div className={`${styles.naviItem}  ${category === RoomCategories.MeetingsCategory ? styles.selectedCategory : ''}`}
              onClick={handleMeetingsCategory}>
              Meetings
            </div>
            <div className={`${styles.naviItem}  ${category === RoomCategories.SettingsCategory ? styles.selectedCategory : ''}`}
              onClick={handleSettingsCategory}>
              Settings
            </div>
          </div>
          <div className={styleCreateForm.toggleContainer}>
            <h3>Jitsi</h3>
            <div className={styleCreateForm.btnsContainer} >
              <ToggleBtn toggleBtnChange={onToggleBtnHandle} /> </div>
            <h3>BigBlueButton</h3>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>

        <div>
          <div className="card">
            <DataTable 
              // style={{minHeight: '95vh'}}
              paginator
              rows={6}
              value={entities}
              removableSort
            >
              <Column field="username" header="Username" sortable></Column>
              <Column field="name" header="Name" sortable></Column>
              <Column field="surname" header="Surname" sortable></Column>
              <Column field="position" header="Position" sortable></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomDetailedComponent