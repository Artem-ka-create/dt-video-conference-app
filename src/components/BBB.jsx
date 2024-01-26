import React, {useState} from 'react'
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom'
// import axios from "axios";
import {http} from 'bigbluebutton-js'
import {
    createJoinUrl,
    getMeetingOperation,
    generateIsMeetingExistsURL,
    getMeetingIdFromUrl,
    setNewUsernameToUrl
} from '../libs/bbbFunctions'
import styles from './UI/Button/UrlButton.module.css';
import {CLIENT_BASE_URL, SECRET_TOKEN, Technologies} from "../data/TechData";
import hex_sha1 from "../libs/paj";

function BBB() {

    const location = useLocation();
    const [joinUrl, setJoinUrl] = useState('');
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

                        let createWindow = window.open(url, "_blank", "noreferrer");
                        var ur = new URL(url);
                        var params = new URLSearchParams(ur.search);
                        var meetingId = params.get("meetingID");
                        var modPw = params.get("moderatorPW");
                        console.log("ID:",meetingId)

                        setAttendeeURL(await createJoinUrl({meetingID:meetingId }, 'AttendeeUSERNAME', modPw))
                        setModeratorURL(await createJoinUrl({meetingID:meetingId }, 'ModeratorUSERNAME', modPw))
                        setJoinUrl(await createJoinUrl({meetingID:meetingId }, username, modPw));
                        //
                        // } else alert('CANNOT CREATE MEETING');

                    } else if (op === 'join') {

                        setJoinUrl(setNewUsernameToUrl(url, username));
                        //
                        // const response = await http(generateIsMeetingExistsURL(getMeetingIdFromUrl(url)));
                        // if (response.running === true) {
                        //     if (username.length === 0) setJoinUrl(url);
                        //     else setJoinUrl(setNewUsernameToUrl(url, username));
                        //
                        // } else alert('Meeting not started');

                    } else alert('THIS URL OPERATION NOT SUPPORTS');

                } else alert('WRONG URL');
            };


            getData();

        },
        // [url]
    );
    function generateBBBInviteLink(bbbMeetingName,password){

        let prepareLink = `${CLIENT_BASE_URL}/invite?conferenceName=${bbbMeetingName}&technology=${Technologies.BBB}&password=${password}`+SECRET_TOKEN;
        let summ = hex_sha1(prepareLink);

        return `${CLIENT_BASE_URL}/invite?conferenceName=${bbbMeetingName}&technology=${Technologies.BBB}&password=${password}&checksum=${summ}`;
    }

    // http://localhost:3000/invite?conferenceName={COnferenceName}&technology=Jitsi&password={userPassword}
    return (

        <>
            {
                joinUrl.length === 0 ?
                    <div>BBB</div> :
                    <>
                        <iframe style={{marginTop: '30px'}} title='frame' src={joinUrl} width="100%" height="500"
                                allow="geolocation *; microphone *; camera *; display-capture *;"
                                webkitallowfullscreen="false"
                                sandbox="allow-same-origin allow-scripts allow-modals allow-forms "
                        ></iframe>
                    </>
            }
            {operation === 'create' &&

                <>
                    <div className={styles.urlContainer}>
                        <button className={styles.urlButton}
                                onClick={() => navigator.clipboard.writeText(attendeeURL)}>Copy
                            Attendee join URL
                        </button>
                        <button className={styles.urlButton}
                                onClick={() => navigator.clipboard.writeText(moderatorURL)}> Copy Moderator join URL
                        </button>
                    </div>
                    <div className={styles.urlContainer}>
                        <button className={styles.urlButton}
                                onClick={() => navigator.clipboard.writeText(generateBBBInviteLink(getMeetingRoomName(),getModeratorPassword() ))}>Copy Invite
                            Attendee URL
                        </button>
                        <button className={styles.urlButton}
                                onClick={() => navigator.clipboard.writeText(generateBBBInviteLink(getMeetingRoomName(),getModeratorPassword()))}> Copy Invite
                            Moderator URL
                        </button>
                    </div>
                </>


            }
        </>
    )
}

export default BBB