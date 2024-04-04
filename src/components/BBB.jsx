import React, {useState} from 'react'
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
import SimpleButton from "./UI/Button/SimpleButton";
import {axiosPrivate} from "../api/axios";

function BBB() {

    const location = useLocation();
    const [joinUrl, setJoinUrl] = useState('');
    const navigate = useNavigate();

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

                        } else alert('CANNOT CREATE MEETING');

                    } else if (op === 'join') {
                        const response = await http(generateIsMeetingExistsURL(getMeetingIdFromUrl(url)));
                        if (response.running === true) {
                            if (username.length === 0) setJoinUrl(url);
                            else setJoinUrl(setNewUsernameToUrl(url, username));

                        } else alert('Meeting not started');

                    } else alert('THIS URL OPERATION NOT SUPPORTS');

                } else alert('WRONG URL');
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

            axiosPrivate.put(`api/v1/conferences/close-conference/${getMeetingRoomName()}`).then((response) => {
                    console.log('Finish meeting response --> ', response.data);
                }
            ).catch((err) => {
                console.warn('Somethig is wrong', err);
            });

            navigate('/');
            window.location.reload();
        }
    }

    return (

        <>
            {
                joinUrl.length === 0 ?
                    <div>BBB</div> :
                    <>
                        <iframe id='bbb' style={{marginTop: '30px'}} title='frame' src={joinUrl} width="100%" height="500"
                                allow="geolocation *; microphone *; camera *; display-capture *;"
                                webkitallowfullscreen="false"
                                sandbox="allow-same-origin allow-scripts allow-modals allow-forms "
                        ></iframe>

                        <SimpleButton hadleButtonFunction={onHandleFinishBBB} btnText={"Finish BBB Meeting"} />

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
                                onClick={() => navigator.clipboard.writeText(generateBBBInviteLink(getMeetingRoomName(), getAttendeePassword()))}>Copy
                            Invite
                            Attendee URL
                        </button>
                        <button className={styles.urlButton}
                                onClick={() => navigator.clipboard.writeText(generateBBBInviteLink(getMeetingRoomName(), getModeratorPassword()))}> Copy
                            Invite
                            Moderator URL
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default BBB