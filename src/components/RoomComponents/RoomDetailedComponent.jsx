import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import styleRoom from './Room.module.css';
import styleCreateForm from '../Forms/CreateForm.module.css'
import styles from './RoomDetailedComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faVideo, faRightToBracket , faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { RoomCategories } from '../../data/TechData';
import ToggleBtn from '../UI/Toggle/ToggleBtn';

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {MeetingsArray} from '../../data/testArrData'
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/Button/SubmitButton";
import {handleEmail} from "../../libs/handleLib";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";



function RoomDetailedComponent({showToast, roomInfo, updateRoom}) {
  const copyLinkIcon = <FontAwesomeIcon icon={faLink} />
  const backArrowIcon = <FontAwesomeIcon icon={faArrowLeft} />
  const addUserIcon = <FontAwesomeIcon icon={faPlus} />
  const startMeetingIcon = <FontAwesomeIcon icon={faVideo} />
  const joinMeetingIcon = <FontAwesomeIcon icon={faRightToBracket} />

  const [category, setCategory] = useState(RoomCategories.UsersCategory);
  const [addUserStatus,setAddUserStatus] = useState(false);
  const [addUserBtnStatus,setAddUserBtnStatus] = useState(true);
  const axiosPrivate = useAxiosPrivate();


  const [newUserData, setNewUserData] = useState({email:""});



  // TODO: finish generate Meeting Table
  // function generateMeetingTable(){
  //   let meetingArr=[];
  //
  //   roomInfo.conferences.forEach((item) => {
  //     // meetingArr.push({ name:item.name, startedAt: item.surname, finishedAt: item.participant.username, attendeesCount: 'IT'});
  //   });
  //
  //   return meetingArr;
  // }
  function generateUserTable(){
    let userArr=[];

    roomInfo.users.forEach((item) => {
      userArr.push({ name:item.name, surname: item.surname, username: item.participant.username, position: 'IT'});
    });

    return userArr;
  }

  const [entities,setEtities
  ] = useState(generateUserTable());
  const running = false;

  useEffect(()=>{
    // productService.getProductsSmall().then((data) => SetProducts({ products: data }));
  },[])
  const handleUsersCategory = () => {
    setCategory(RoomCategories.UsersCategory)
    setEtities(generateUserTable());
    
  }
  const handleMeetingsCategory = () => {
    setCategory(RoomCategories.MeetingsCategory)
    setEtities(MeetingsArray);
  }
  const handleSettingsCategory = () => {
    setCategory(RoomCategories.SettingsCategory)

  }
  function onToggleBtnHandle(event) {
    console.log(event);
  }

  const addNewUserEvent =(event) => {
    event.preventDefault();

    //TODO : update user in Roo and roomlist

    axiosPrivate.put(`/api/v1/rooms/add-user`,
        {
          newUserEmail: newUserData.email,
          roomId: roomInfo.id,
          initiatorUserId: localStorage.getItem("DTMeetUser")
        }).then((response)=> {

          setNewUserData({email:""});
          showToast('success', 'Super!',`User has been successfully added to ${roomInfo.name}`, 2000);
          updateRoom(response.data);

        }).catch((err) => {
          console.log(err)
          showToast('error', 'Oh',`User ${newUserData.email} cannot be added to room ${roomInfo.name}`, 2000)

        });


  }

  const handleBackButton =() => {

    if (addUserStatus===true){
      setNewUserData({email:""})
      console.log("Current category --> ",category);
      if (category===RoomCategories.UsersCategory){
        setCategory(RoomCategories.UsersCategory)
        setEtities(generateUserTable());
      }else if (category===RoomCategories.MeetingsCategory){
        //TODO:  generate meeting arr add function
        setCategory(RoomCategories.MeetingsCategory)
        console.log("GENERATE NEW MEETINGS TABLE-->>>")
      }
    }

    setAddUserStatus(!addUserStatus);

  }

  useEffect(()=>{

    if (newUserData.email.length>0 && handleEmail(newUserData.email).length===0){

      setAddUserBtnStatus(false);
    }
    else{
      setAddUserBtnStatus(true);
    }
  },[newUserData]);


  return (
    <>
      {/* <div>RoomDetailedComponent</div> */}

      <div className={styles.headerContainer}>

        <div className={styles.roomInfo}>
          <div className={styles.naviContainer}>
            <div className={styles.roomName}>{roomInfo.name}</div>
            <div className={styles.btnContainer}>

              <Button label={running ? joinMeetingIcon : startMeetingIcon} className={`${styleRoom.dialogSaveBtnPrm} ${styles.startJoinBtn}`} />
              <Button label={running ? copyLinkIcon : addUserStatus? backArrowIcon : addUserIcon} className={`${styleRoom.dialogCloseBtnPrm} ${styles.copyLinkBtn}`} onClick={()=>handleBackButton() } outlined />
            </div>
          </div>
          { running ? <div className={styles.liveBox}>Live</div> : <div style={{ color: '#909090' }}>Last session, May 2023 at 10:31 AM</div>}
        </div>
        <hr className={styles.roomLine} />

      </div>



      <div className={styles.bottomContainer}>

        {addUserStatus?

            <form  onSubmit={addNewUserEvent} className={styles.addUserContainer}>

                <Input
                    labelText={"New user email"} entity='email'
                    value={newUserData.email} setInput={setNewUserData}
                    Data={newUserData} handleFunction={handleEmail}/>

                <SubmitButton btnDisabled={addUserBtnStatus} btnText={"Add new user"}/>
              </form>

          :

            <>
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

              <div>

                {category === RoomCategories.SettingsCategory?
                <h1>SETTINGS</h1>
                    :
                <div className="card">

                    {category===RoomCategories.MeetingsCategory ?
                        <DataTable paginator rows={6} value={entities} removableSort>
                          <Column field="name" header="Name" sortable></Column>
                          <Column field="startedAt" header="Started at" sortable></Column>
                          <Column field="finishedAt" header="Finished at" sortable></Column>
                          <Column field="attendeesCount" header="Count" sortable></Column>
                        </DataTable>
                        :
                        <DataTable paginator rows={6} value={entities} removableSort>
                          <Column field="username" header="Username" sortable></Column>
                          <Column field="name" header="Name" sortable></Column>
                          <Column field="surname" header="Surname" sortable></Column>
                          <Column field="position" header="Position" sortable></Column>
                        </DataTable>
                    }
                </div>
                }
              </div>
            </>
        }
      </div>
    </>
  )
}

export default RoomDetailedComponent