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
function AddRoom() {
    const [visible, setVisible] = useState(false);
    const [newRoomData,SetNewRoomData] = useState(NewRoomDataDTO);
    const [disablebtnStatus, SetDisableBtnStatus] = useState(false);


    const footerContent = (
        <div>
            <Button label="Close" className={styles.dialogCloseBtnPrm}  onClick={() => closeDialog()}  />
            <Button label="Save" className={` ${disablebtnStatus ? styles.dialogSaveBtnPrm : styles.disabledStatusbtn  }`}  onClick={() => handleSaveNewRoom()}  />

        </div>
    );
    const closeDialog = ()=>{
        setVisible(false);
        SetNewRoomData(NewRoomDataDTO);
    };

    const handleSaveNewRoom = () => {
        if (disablebtnStatus){

            console.log('CREATED NEW ROOM : ');
            closeDialog();
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