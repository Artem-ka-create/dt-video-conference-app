import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

import SubmitButton from '../UI/Button/SubmitButton'
import Input from '../UI/Input/Input'
import styles from './JoinForm.module.css'
import {handleJoinFormDataAuth, handleJoinFormDataNotAuth, handleSimpleField, handleUrl} from '../../libs/handleLib';
import {JoinMeetingDTO} from '../../data/Dtos';
import {JitsiConfigData} from "../../data/JitsiConfig";

import {Technologies} from "../../data/TechData";
import axios from "../../api/axios";

function JoinForm({onChangePanel, showToast}) {
    const navigate = useNavigate();
    const [btnStatus, SetButtonStatus] = useState(true);

    const {auth} = useAuth();

    const [data, setData] = useState(JoinMeetingDTO(auth.username));

    function handleDomain(joinData){
        if (data.url.replace('https://', '').split('/')[0] === `${JitsiConfigData.DOMAIN}`) {
            navigate(`./${Technologies.JITSI}`, joinData);
        } else if (data.url.replace('https://', '').split('/')[1] === 'bigbluebutton') {
            navigate(`./${Technologies.BBB}`, joinData);
        } else {
            alert(' This url not supports')
        }
    }
    function getMeetingIDBBB(url) {
        const urlObject = new URL(url);
        const searchParams = urlObject.searchParams;
        return searchParams.get('meetingID');
    }

    function getConferenceNameByUrl(url){
        console.log("hello")
        let jitsiStatus = url.replace('https://', '').split('/')[0] === `${JitsiConfigData.DOMAIN}`;
        let bbbStatus = url.replace('https://', '').split('/')[1] === 'bigbluebutton';

        console.log(bbbStatus,jitsiStatus);

        return jitsiStatus ?  url.match(/\/([^/]+)$/)[1] : bbbStatus? getMeetingIDBBB(url) : '';
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();



        // https://jitsi.hamburg.ccc.de/tyujtyy
        // JUST FOR JITSI
        let reqestBody = {
            conferenceName:getConferenceNameByUrl(data.url),
            username:data.username,
            userId: auth.id ? auth.id: ''
        }

        console.log('Sending request---> ',reqestBody);


        let isMounted = true;
        const controller = new AbortController();

        const joinRoom = async () => {
            try {

                 // eslint-disable-next-line
                const response = await axios.put(`/api/v1/conferences/join-conference`, {
                    signal: controller.signal,
                    conferenceName : reqestBody.conferenceName,
                    username: reqestBody.username,
                    userId: reqestBody.userId
                });

                if (isMounted) {
                    let joinData = {state: {url: data.url, username: data.username}};
                    handleDomain(joinData);
                    onChangePanel(false);
                    setData(JoinMeetingDTO);
                    showToast('success', "Great", "User has been successfully joined");

                }else{
                    console.log(response)
                }
            } catch (err) {
                console.error(err);
                showToast("error", "Oh", "Something went wrong", 2000);

            }
        }

        joinRoom();

        return () => {
            isMounted = false;
            controller.abort();
        }

    };

    useEffect(() => {
        console.log("DTTAAA-->",data)
        SetButtonStatus(auth.id? handleJoinFormDataAuth(data): handleJoinFormDataNotAuth(data));
    }, [data, auth.id])

    return (
        <>
            <h2>Join To Meeting</h2>

            <form onSubmit={onSubmitHandler} className={styles.form_container}>
                {auth.id ?
                    <></>
                    :
                    <Input labelText={"Username"} entity='username' value={data.username} setInput={setData} Data={data}
                           handleFunction={handleSimpleField}/>

                }
                <Input labelText={"Url"} entity='url' value={data.url} setInput={setData} Data={data}
                       handleFunction={handleUrl}/>

                <SubmitButton btnDisabled={btnStatus} btnText={'Join to meeting'}/>
            </form>
        </>
    )
}

export default JoinForm