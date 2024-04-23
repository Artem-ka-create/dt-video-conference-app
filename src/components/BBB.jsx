import React, {useRef, useState} from 'react'
import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import {http} from 'bigbluebutton-js'
import {
    createJoinUrl,
    getMeetingOperation,
    generateIsMeetingExistsURL,
    getMeetingIdFromUrl,
    setNewUsernameToUrl,
    endMeeting
} from '../libs/bbbFunctions'
import styles from './UI/Button/UrlButton.module.css';
import {CLIENT_BASE_URL, SECRET_TOKEN, Technologies} from "../data/TechData";
import hex_sha1 from "../libs/paj";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhoneSlash} from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';

function BBB() {

    const location = useLocation();
    const [joinUrl, setJoinUrl] = useState('');
    const navigate = useNavigate();
    const toast = useRef(null);

    console.log(location);

    const [attendeeURL, setAttendeeURL] = useState('');
    const [moderatorURL, setModeratorURL] = useState('');

    const {url, username, attendeePW, moderatorPW} = location.state;
    const [operation, setOperation] = useState('');

    const getMeetingRoomName = () =>{
        var ur = new URL(url);
        var params = new URLSearchParams(ur.search);
        return params.get("meetingID");
    }
    const getModeratorPassword = () =>{
        var ur = new URL(url);
        var params = new URLSearchParams(ur.search);
        return params.get("moderatorPW");
    }
    const getAttendeePassword = () =>{
        var ur = new URL(url);
        var params = new URLSearchParams(ur.search);
        return params.get("attendeePW");
    }

    useEffect(() => {

            const getData = async () => {

                if (url.includes('meetingID=')) {
                    const op = getMeetingOperation(url);
                    setOperation(getMeetingOperation(url))

                    if (op === 'create') {
                        const response = await http(url);

                        console.log("BBB-RESPONSE", response);

                        if (response.returncode === 'SUCCESS') {
                            setAttendeeURL(await createJoinUrl(response, 'AttendeeUSERNAME', attendeePW))
                            setModeratorURL(await createJoinUrl(response, 'ModeratorUSERNAME', moderatorPW))

                            setJoinUrl(await createJoinUrl(response, username, moderatorPW));

                        } else console.warn('CANNOT CREATE MEETING');

                    } else if (op === 'join') {
                        const response = await http(generateIsMeetingExistsURL(getMeetingIdFromUrl(url)));
                        if (response.running === true) {
                            if (username.length === 0) setJoinUrl(url);
                            else setJoinUrl(setNewUsernameToUrl(url, username));

                        } else console.warn('Meeting not started');

                    } else console.warn('THIS URL OPERATION NOT SUPPORTS');

                } else console.warn('WRONG URL');
            };

            getData();

        },
        // [url]
    );


    function generateBBBInviteLink(bbbMeetingName,password){

        let prepareLink = `${CLIENT_BASE_URL}/invite?conferenceName=${bbbMeetingName}&technology=${Technologies.BBB}&password=${password}`+SECRET_TOKEN;
        let summ = hex_sha1(prepareLink)

        return `${CLIENT_BASE_URL}/invite?conferenceName=${bbbMeetingName}&technology=${Technologies.BBB}&password=${password}&checksum=${summ}`;
    }



    const onHandleFinishBBB= async () => {

        const response = await http(endMeeting(getMeetingRoomName(),getAttendeePassword()));

        console.log("BBB-RESPONSE", response);

        if (response.returncode === 'SUCCESS') {
            console.log("MEETING ENDED")

            axios.put(`api/v1/conferences/close-conference/${getMeetingRoomName()}`,{},{
                headers:{"Content-Type":'application/json'},
                withCredentials:true
            }).then((response) => {
                    console.log('Finish meeting response --> ', response.data);
                    navigate('/');
                    window.location.reload();
                }
            ).catch((err) => {
                console.warn('Somethig is wrong', err);
            });
        }else{
            navigate('/');
            window.location.reload();
        }


    }

    function copyEvent(entity,urlToCopy){
        navigator.clipboard.writeText(urlToCopy);
        toast.current.show({severity:'info', summary: `URL Copy`, detail:`${entity} url copied`, life: 1500});
    }

    return (

        <>

            <Toast ref={toast} />

            {
                joinUrl.length === 0 ?
                    <div>BBB</div> :
                    <>
                        <iframe id='bbb' style={{marginTop: '0.625rem'}} title='frame' src={joinUrl} width="100%" height="500"
                                allow="geolocation *; microphone *; camera *; display-capture *;"
                                webkitallowfullscreen="false"
                                sandbox="allow-same-origin allow-scripts allow-modals allow-forms "
                        ></iframe>

                        <Button label={<div style={{display:"flex", alignItems:"center", justifyContent:"space-around", width:"9.375rem"}}>
                            <div>Finish Meeting</div><FontAwesomeIcon icon={faPhoneSlash}/>
                        </div>} severity={"danger"} onClick={onHandleFinishBBB}/>

                    </>
            }
            {operation === 'create' &&


                <>
                    <div className={styles.urlContainer} style={{marginBottom:'1rem'}}>

                        <Button label="Copy Attendee join URL" className="p-button-outlined" onClick={
                            ()=> copyEvent('Attendee', attendeeURL)} />

                        <Button label="Copy Moderator join URL" className="p-button-outlined" onClick={
                            ()=> copyEvent('Moderator', moderatorURL)} />

                    </div>
                    <div className={styles.urlContainer}>
                        <Button label="Copy DTMeet Attendee invite URL" className="p-button-outlined" onClick={
                            ()=> copyEvent('DTMeet Attendee invite', generateBBBInviteLink(getMeetingRoomName(), getAttendeePassword()))} />

                        <Button label="Copy DTMeet Moderator invite URL" className="p-button-outlined" onClick={
                            ()=> copyEvent('DTMeet Moderator invite', generateBBBInviteLink(getMeetingRoomName(), getModeratorPassword()))} />

                    </div>
                </>
            }
        </>
    )
}

export default BBB