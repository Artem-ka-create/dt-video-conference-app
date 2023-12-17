import React, { useState} from 'react'
import styles from './Room.module.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear, faUser, faVideo, faCirclePlay } from '@fortawesome/free-solid-svg-icons'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import RoomDetailedComponent from './RoomDetailedComponent';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Room({roomDetail,showToast, roomsArr, roomInitialize}) {

  const [showConfirmation,setShowConfirmation] = useState(false);
  const [showRoomDetails,setShowRoomDetails] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [localRoom, setLocalRoom] = useState(roomDetail);


  const handleDeleteOfRoom = () => {
      // TODO:  MAKE room removing correctly
      axiosPrivate.put(`/api/v1/rooms/${localRoom.id}/users/${localStorage.getItem('DTMeetUserId')}`).then((resp)=>{
          console.log(resp);
          showToast("success", "Great", "You removed from room successfully");
          setShowConfirmation(false)
          roomInitialize(roomsArr.filter((item)=> item.id !== localRoom.id));
      }).catch((err)=>{
          if (err){
              showToast("error", "Error", "No server connection");
          }
          showToast("error", "Error", "No server connection");

      });

  };

  const updateAllRooms = () => {
      axiosPrivate.get(`/api/v1/rooms/users/${localStorage.getItem('DTMeetUserId')}`)
          .then((response) => {
              console.log("LOCALROOMCHANGE-> UPDT roomList : ", response.data);
              roomInitialize(response.data);
          })
          .catch((err)=> {
              console.warn(err)
          });
    }

    const handleDialogClose =() => {
        setShowRoomDetails(false);
        updateAllRooms();
    }


  const footer = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setShowConfirmation(false)} className="p-button-danger p-button-text" />
      <Button label="Yes" icon="pi pi-check"  className="p-button-danger" onClick={() => handleDeleteOfRoom()} autoFocus />
    </div>
  )

  return (
    <div className={`${styles.itemBlock} ${styles.roomBlock}`}>
      <div className={`${styles.rowInfo}`}>
        <div>
          < FontAwesomeIcon icon={faUser} /> {localRoom.users.length}
        </div>
          {/*TODO: */}
          {/*<div className={styles.liveStatus}>*/}
          {/*    < FontAwesomeIcon style={{fontSize:'15px'}} icon={faCirclePlay} />*/}
          {/*    <div>*/}
          {/*        Live*/}
          {/*    </div>*/}

          {/*</div>*/}
        < FontAwesomeIcon onClick={ () => setShowConfirmation(true) } className={styles.operationBtn} icon={faCircleXmark} />
      </div>
      <div className={styles.titleName}>
          {localRoom.name}
      </div>
      <div className={`${styles.rowInfo}`}>
        <div>
          < FontAwesomeIcon icon={faVideo} /> {localRoom.conferences.length}
        </div>

        < FontAwesomeIcon className={styles.operationBtn} icon={faGear} onClick={()=> setShowRoomDetails(true)} />
      </div>

      <Dialog header={localRoom.name} visible={showConfirmation} draggable={false} modal style={{ width: '40vw' }} footer={footer} onHide={() => setShowConfirmation(false)}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          <span className={styles.alertbtn}>Are you sure you want to delete this room</span>
        </div>
      </Dialog>

      <Dialog  draggable={false} visible={showRoomDetails} style={{ width: '90vw' , height:' 125.6vh'}}  onHide={() => handleDialogClose()}>

            <RoomDetailedComponent showToast={showToast} roomInfo={localRoom} updateRoom={setLocalRoom} />
      </Dialog>
    </div>
  )
}

export default Room