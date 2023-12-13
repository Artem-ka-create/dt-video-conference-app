import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

import SubmitButton from '../UI/Button/SubmitButton'
import Input from '../UI/Input/Input'
import styles from './JoinForm.module.css'
import {handleJoinFormDataAuth, handleJoinFormDataNotAuth, handleSimpleField, handleUrl} from '../../libs/handleLib';
import {JoinMeetingDTO} from '../../data/Dtos';
import {JitsiConfigData} from "../../data/JitsiConfig";

// TODO: disable usernameimput if authorized

function JoinForm({onChangePanel}) {
    const navigate = useNavigate();
    const [btnStatus, SetButtonStatus] = useState(true);
    const {auth} = useAuth();

    const [data, setData] = useState(JoinMeetingDTO(auth.username));

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // check by domains technology
        let result = {state: {url: data.url, username: data.username}};

        if (data.url.replace('https://', '').split('/')[0] === `${JitsiConfigData.DOMAIN}`) {
            navigate('./jitsi', result);
        } else if (data.url.replace('https://', '').split('/')[1] === 'bigbluebutton') {
            navigate('./bbb', result);
        } else {
            alert(' This url not supports')
        }
        onChangePanel(false)

        setData(JoinMeetingDTO);
    };

    useEffect(() => {
        console.log("DTTAAA-->",data)
        SetButtonStatus(auth.id? handleJoinFormDataAuth(data): handleJoinFormDataNotAuth(data));
    }, [data, auth.id])

    return (
        <>
            <h2>JoinForm</h2>

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