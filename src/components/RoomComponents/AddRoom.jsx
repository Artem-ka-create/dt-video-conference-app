import React,{useEffect, useState} from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import styles from './Room.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Input from '../UI/Input/Input';
import {handleSimpleField} from '../../libs/handleLib';


import {NewRoomDataDTO} from '../../data/Dtos';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


function AddRoom({showToast , roomsArr, roomInitialize}) {
    const [visible, setVisible] = useState(false);
    const [newRoomData,SetNewRoomData] = useState(NewRoomDataDTO);
    const [disablebtnStatus, SetDisableBtnStatus] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const addNewRoom = (newRoom) => {
        console.log('New room to rooms ')
        showToast('success', 'Great', 'New room was created !', 2000);
        roomInitialize([...roomsArr,newRoom])
    }
    const footerContent = (
        <div>
            <Button label="Close"  className={styles.dialogCloseBtnPrm}  onClick={() => closeDialog()}  />
            <Button label="Save" className={` ${disablebtnStatus ? styles.dialogSaveBtnPrm : styles.disabledStatusbtn  }`}  onClick={() => handleSaveNewRoom()}  />

        </div>
    );
    const closeDialog = ()=>{
        setVisible(false);
        SetNewRoomData(NewRoomDataDTO);
    };

    const handleSaveNewRoom = () => {
        if (disablebtnStatus){

            let isMounted = true;
            const controller = new AbortController();

            const saveRoom = async () => {
                try {

                    const response = await axiosPrivate.post(`/api/v1/rooms/owners/${localStorage.getItem('DTMeetUserId')}`, {
                        signal: controller.signal,
                        name : newRoomData.meetingName,
                        colorTag: '#000000'

                    });
                    console.log('RESPONSEEE-> ',response.data);
                    isMounted && addNewRoom(response.data);
                } catch (err) {
                    showToast('error', 'Error', 'It is a problem', 2000);
                    console.error(err);
                    navigate('/signin', { state: { from: location }, replace: true });
                }
            }

            saveRoom();
            closeDialog();


            return () => {
                isMounted = false;
                controller.abort();
            }


        }
    }

    useEffect(()=>{

        if(newRoomData.meetingName.length>0 && handleSimpleField(newRoomData.meetingName).length===0){
            SetDisableBtnStatus(true);
        }
        else{
            SetDisableBtnStatus(false);
        }
    },[newRoomData]);


  return (<>
    <div onClick={()=>setVisible(!visible)}className={`${styles.itemBlock} ${styles.addItemBlock}`}>
      <FontAwesomeIcon icon={faPlus} />

    </div>
    
    <div className="dialogClass flex justify-content-center">
            <Dialog draggable={false} header={'Create new Room'} visible={visible} style={{ width: '60vw', height:'320px' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div style={{margin:'20px'}}>
                    {/* <p className="m-0"> */}
                    <Input 
                        labelText={"Room Name"} 
                        entity='meetingName' value={newRoomData.meetingName} 
                        setInput={SetNewRoomData} Data={newRoomData} handleFunction={handleSimpleField}/>
                        
                    {/* </p> */}
                </div>
                

            </Dialog>
    </div>
  </>
  )
}

export default AddRoom