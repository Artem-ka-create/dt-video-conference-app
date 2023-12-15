import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

import SubmitButton from '../UI/Button/SubmitButton'
import Input from '../UI/Input/Input'
import styles from './JoinForm.module.css'
import {handleJoinFormDataAuth, handleJoinFormDataNotAuth, handleSimpleField, handleUrl} from '../../libs/handleLib';
import {CreateMeetingDTO, JoinMeetingDTO} from '../../data/Dtos';
import {JitsiConfigData} from "../../data/JitsiConfig";
import {axiosPrivate} from "../../api/axios";
import {Technologies} from "../../data/TechData";
import {generateMeetingUrl} from "../../libs/bbbFunctions";

// TODO: disable usernameimput if authorized

function JoinForm({onChangePanel, showToast}) {
    const navigate = useNavigate();
    const [btnStatus, SetButtonStatus] = useState(true);
    const {auth} = useAuth();

    const [data, setData] = useState(JoinMeetingDTO(auth.username));

    function handleDomain(joinData){
        if (data.url.replace('https://', '').split('/')[0] === `${JitsiConfigData.DOMAIN}`) {
            navigate('./jitsi', joinData);
        } else if (data.url.replace('https://', '').split('/')[1] === 'bigbluebutton') {
            navigate('./bbb', joinData);
        } else {
            alert(' This url not supports')
        }
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();

        const regex = /\/([^\/]+)$/;
        // https://jitsi.hamburg.ccc.de/tyujtyy
        // JUST FOR JITSI
        let reqestBody = {
            conferenceName:data.url.match(regex)[1],
            username:data.username,
            userId: auth.id ? auth.id: ''
        }


        let isMounted = true;
        const controller = new AbortController();

        const createRoom = async () => {
            try {

                const response = await axiosPrivate.put(`/api/v1/conferences/join-conference`, {
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

                }
            } catch (err) {
                console.error(err);
                showToast("error", "Oh", "Something went wrong", 2000);

            }
        }

        createRoom();

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