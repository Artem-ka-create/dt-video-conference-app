import {Button} from 'primereact/button';
import React, {useEffect, useState} from 'react';
import styleRoom from './Room.module.css';
import styleCreateForm from '../Forms/CreateForm.module.css'
import styles from './RoomDetailedComponent.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLink, faVideo, faRightToBracket, faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {RoomCategories, Technologies} from '../../data/TechData';
import ToggleBtn from '../UI/Toggle/ToggleBtn';

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/Button/SubmitButton";
import {handleEmail} from "../../libs/handleLib";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {JitsiConfigData} from "../../data/JitsiConfig";
import {generateMeetingUrl} from "../../libs/bbbFunctions";
import {useNavigate} from "react-router-dom";


function RoomDetailedComponent({showToast, roomInfo, updateRoom, isRunningStatus}) {
    const copyLinkIcon = <FontAwesomeIcon icon={faLink}/>
    const backArrowIcon = <FontAwesomeIcon icon={faArrowLeft}/>
    const addUserIcon = <FontAwesomeIcon icon={faPlus}/>
    const startMeetingIcon = <FontAwesomeIcon icon={faVideo}/>
    const joinMeetingIcon = <FontAwesomeIcon icon={faRightToBracket}/>

    const [category, setCategory] = useState(RoomCategories.UsersCategory);
    const [addUserStatus, setAddUserStatus] = useState(false);
    const [addUserBtnStatus, setAddUserBtnStatus] = useState(true);
    const [technologyName, setTechnologyName] = useState(Technologies.JITSI);
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const navigate = useNavigate();


    const [newUserData, setNewUserData] = useState({email: ""});

    function formatDateToUser(inputDateString){
        const inputDate = new Date(inputDateString);

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const monthsOfYear = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
        const month = monthsOfYear[inputDate.getUTCMonth()];
        const year = inputDate.getUTCFullYear();
        const hours = inputDate.getUTCHours();
        const minutes = inputDate.getUTCMinutes();
        const seconds = inputDate.getUTCSeconds();

        return`${dayOfWeek} (${inputDate.getUTCDate()}) ${month} (${year}) - ${hours+1}:${minutes}:${seconds}`;
    }

    function calculateDuration(startTimeStr, endTimeStr) {
        const startTime = new Date(startTimeStr);
        const endTime = new Date(endTimeStr);

        // Calculate the difference in milliseconds
        const durationInMilliseconds = endTime - startTime;

        // Convert milliseconds to seconds
        const durationInSeconds = durationInMilliseconds / 1000;

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        const formattedResult = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        return formattedResult;
    }

    // TODO: finish generate Meeting Table
    function generateMeetingTable(){
      let meetingArr=[];

      roomInfo.conferences.forEach((item) => {
        meetingArr.push({ duration:calculateDuration(item.createdDate,item.completedDate), startedAt: formatDateToUser(item.createdDate), finishedAt: formatDateToUser(item.completedDate), attendeesCount: item.participants.length});
      });


      return meetingArr.reverse();
    }
    function generateUserTable() {
        let userArr = [];

        roomInfo.users.forEach((item) => {
            userArr.push({name: item.name, surname: item.surname, username: item.participant.username, position: 'IT'});
        });

        return userArr;
    }

    const [entities, setEtities
    ] = useState(generateUserTable());
    // const [meets, setMeets
    // ] = useState(generateMeetingTable());

    useEffect(() => {
        // productService.getProductsSmall().then((data) => SetProducts({ products: data }));
    }, [])
    const handleUsersCategory = () => {
        setCategory(RoomCategories.UsersCategory)
        setEtities(generateUserTable());

    }
    const handleMeetingsCategory = () => {
        setCategory(RoomCategories.MeetingsCategory)
        setEtities(generateMeetingTable());
    }
    const handleSettingsCategory = () => {
        setCategory(RoomCategories.SettingsCategory)

    }

    function onToggleBtnHandle() {
        setTechnologyName(technologyName === Technologies.JITSI ? Technologies.BBB : Technologies.JITSI);
    }

    const addNewUserEvent = (event) => {
        event.preventDefault();

        //TODO : update user in Roo and roomlist

        axiosPrivate.put(`/api/v1/rooms/add-user`,
            {
                newUserEmail: newUserData.email,
                roomId: roomInfo.id,
                initiatorUserId: auth.id
            }).then((response) => {

            setNewUserData({email: ""});
            showToast('success', 'Super!', `User has been successfully added to ${roomInfo.name}`, 2000);
            updateRoom(response.data);

        }).catch((err) => {
            console.log(err)
            showToast('error', 'Oh', `User ${newUserData.email} cannot be added to room ${roomInfo.name}`, 2000)

        });


    }

    const handleBackButton = () => {

        if (!isRunningStatus) {

            if (addUserStatus === true) {
                setNewUserData({email: ""})
                console.log("Current category --> ", category);
                if (category === RoomCategories.UsersCategory) {
                    setCategory(RoomCategories.UsersCategory)
                    setEtities(generateUserTable());
                } else if (category === RoomCategories.MeetingsCategory) {
                    //TODO:  generate meeting arr add function
                    setCategory(RoomCategories.MeetingsCategory)
                    console.log("GENERATE NEW MEETINGS TABLE-->>>")
                }
            }

            setAddUserStatus(!addUserStatus);
        }

    }
    const handleCopyJoinLinkButton = () => {
        console.log('COPY JOIN LINK ')
    }

    useEffect(() => {

        if (newUserData.email.length > 0 && handleEmail(newUserData.email).length === 0) {

            setAddUserBtnStatus(false);
        } else {
            setAddUserBtnStatus(true);
        }
    }, [newUserData]);

    const handleJoinToMeeting = () => {


        console.log('JOIN TO MEETING')

        axiosPrivate.put(`/api/v1/conferences/join-conference`, {
            conferenceName: roomInfo.name,
            username: auth.username,
            userId: auth.userId
        }).then((response) => {

            let url = technologyName === Technologies.JITSI ?
                `https://${JitsiConfigData.DOMAIN}/` + roomInfo.name :
                generateMeetingUrl({attendeePW: 'attPass', moderatorPW: 'modePass', name: roomInfo.name});

            let joinData = {state: {url: url, username: auth.username}};
            technologyName === Technologies.JITSI ? navigate('./join/jitsi', joinData) : navigate('./join/bbb', joinData);
            showToast('success', "Great", "User successfuly joined to room");

        }).catch((err) => {

            showToast('error', "Oh", "You cannot join to meeting");
            console.warn(err);
        });
    }
    const handleRoomMeetingStart = () => {


        axiosPrivate.put(`/api/v1/rooms/${roomInfo.id}/users/${auth.id}/technologies/${technologyName}/add-conference`)
            .then((response) => {

                let createdConference = response.data.conferences.find(conf => conf.completedDate === null)
                console.log('CREATED Meeting _---->>>', createdConference);
                // setRunniingStatus(true);
                setAddUserStatus(false);
                setCategory(RoomCategories.UsersCategory);

                let resultUrl = '';
                if (technologyName === Technologies.JITSI) {
                    resultUrl = `https://${JitsiConfigData.DOMAIN}/` + response.data.name;
                } else if (technologyName === Technologies.BBB) {
                    resultUrl = generateMeetingUrl({
                        name: createdConference.name,
                        attendeePW: createdConference.attendeePassword,
                        moderatorPW: createdConference.moderatorPassword
                    })
                }
                navigate(`./create/${technologyName}`, {
                    state: {
                        url: resultUrl,
                        username: auth.username,
                        attendeePW: createdConference.attendeePassword,
                        moderatorPW: createdConference.moderatorPassword
                    }
                });


                showToast('success', 'Super!', `Meeting has been started in room ${roomInfo.name}`, 2000);

            }).catch((err) => {
            console.log(err)
            showToast('error', 'Oh', `You cannot start meeting in room ${roomInfo.name}`, 2000);

        });


    }
    return (
        <>
            {/* <div>RoomDetailedComponent</div> */}

            <div className={styles.headerContainer}>

                <div className={styles.roomInfo}>
                    <div className={styles.naviContainer}>
                        <div className={styles.roomName}>{roomInfo.name}</div>
                        <div className={styles.btnContainer}>

                            {isRunningStatus ?
                                <>
                                    <Button label={joinMeetingIcon}
                                            className={`${styleRoom.dialogSaveBtnPrm} ${styles.startJoinBtn}`}
                                            onClick={handleJoinToMeeting}/>
                                    <Button label={copyLinkIcon}
                                            className={`${styleRoom.dialogCloseBtnPrm} ${styles.copyLinkBtn}`}
                                            onClick={() => handleCopyJoinLinkButton()} outlined/>
                                </>
                                :
                                <>
                                    <Button label={startMeetingIcon}
                                            className={`${styleRoom.dialogSaveBtnPrm} ${styles.startJoinBtn}`}
                                            onClick={handleRoomMeetingStart}/>
                                    <Button label={addUserStatus ? backArrowIcon : addUserIcon}
                                            className={`${styleRoom.dialogCloseBtnPrm} ${styles.copyLinkBtn}`}
                                            onClick={() => handleBackButton()} outlined/>
                                </>

                            }
                        </div>
                    </div>
                    {isRunningStatus ? <div className={styles.liveBox}>Live</div> :
                        <div style={{color: '#909090'}}>
                                <></>
                                <>Last session finished ,vf </>
                        </div>
                    }
                </div>
                <hr className={styles.roomLine}/>

            </div>


            <div className={styles.bottomContainer}>

                {addUserStatus ?

                    <form onSubmit={addNewUserEvent} className={styles.addUserContainer}>

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
                                <div
                                    className={`${styles.naviItem}  ${category === RoomCategories.UsersCategory ? styles.selectedCategory : ''}`}
                                    onClick={handleUsersCategory}>
                                    Users
                                </div>
                                <div
                                    className={`${styles.naviItem}  ${category === RoomCategories.MeetingsCategory ? styles.selectedCategory : ''}`}
                                    onClick={handleMeetingsCategory}>
                                    Meetings
                                </div>
                                <div
                                    className={`${styles.naviItem}  ${category === RoomCategories.SettingsCategory ? styles.selectedCategory : ''}`}
                                    onClick={handleSettingsCategory}>
                                    Settings
                                </div>
                            </div>
                            {isRunningStatus ?
                                <h3>{technologyName} is running</h3>
                                :
                                <div className={styleCreateForm.toggleContainer}>
                                    <h3>Jitsi</h3>
                                    <div className={styleCreateForm.btnsContainer}>
                                        <ToggleBtn toggleBtnChange={onToggleBtnHandle}/></div>
                                    <h3>BigBlueButton</h3>
                                </div>

                            }

                        </div>

                        <div>

                            {category === RoomCategories.SettingsCategory ?
                                <h1>SETTINGS</h1>
                                :
                                <div className="card">

                                    {category === RoomCategories.MeetingsCategory ?
                                        <DataTable paginator rows={6} value={entities} removableSort>
                                            <Column field="duration" header="Duration" sortable></Column>
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