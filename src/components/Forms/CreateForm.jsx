import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';

import styles from './CreateForm.module.css';
import Input from '../UI/Input/Input';
import SubmitButton from '../UI/Button/SubmitButton';
import ToggleBtn from '../UI/Toggle/ToggleBtn';
import {generateMeetingUrl} from '../../libs/bbbFunctions';
import {Technologies} from '../../data/TechData';
import {handleCreateFormDataAuth, handleCreateFormDataNotAuth, handleSimpleField} from '../../libs/handleLib';
import {CreateMeetingDTO} from '../../data/Dtos'
import {JitsiConfigData} from "../../data/JitsiConfig";
import {axiosPrivate} from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// TODO: disable usernameimput if authorized

function CreateForm({onChangePanel, showToast}) {

    const navigate = useNavigate();
    const [btnStatus, SetButtonStatus] = useState(true);
    const {auth} = useAuth();


    const [urlData, setUrlData] = useState(
        CreateMeetingDTO(auth.username)
    );

    function onToggleBtnHandle(event) {
        console.log(event);
        let result = event ? Technologies.BBB : Technologies.JITSI
        // eslint-disable-next-line
        setUrlData({...urlData, ['technologyName']: result})
        console.log(urlData);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let result = '';
        let isMounted = true;
        const controller = new AbortController();

        const createRoom = async () => {
            try {

                const response = await axiosPrivate.post(`/api/v1/conferences/add-conference`, {
                    signal: controller.signal,
                    conferenceName : urlData.name,
                    participantName: urlData.username,
                    technology: urlData.technologyName,
                    attendeePassword: urlData.attendeePW,
                    moderatorPassword: urlData.moderatorPW,
                    userId : auth.id ? auth.id : null
                });
                console.log('RESPONSEEE-> ', response.data);
                if (isMounted) {
                    if (urlData.technologyName === Technologies.JITSI) {
                        result = `https://${JitsiConfigData.DOMAIN}/` + urlData.name;
                        console.log(result);
                    } else if (urlData.technologyName === Technologies.BBB) {
                        result = generateMeetingUrl(urlData)
                    }

                    showToast("success", "Great", `Room ${urlData.name} was successfully created`, 2000);
                    onChangePanel(false)
                    setUrlData(CreateMeetingDTO(auth.username));

                    navigate(`./${urlData.technologyName}`, {
                        state: {
                            url: result,
                            username: urlData.username,
                            attendeePW: urlData.attendeePW,
                            moderatorPW: urlData.moderatorPW
                        }
                    });
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
        console.log("UELDADAA->",urlData);
        SetButtonStatus(auth.id ? handleCreateFormDataAuth(urlData) : handleCreateFormDataNotAuth(urlData));
    }, [urlData,auth.id])

    return (

        <form onSubmit={onSubmitHandler} className={styles.form_container}>
            <h2>Create Meeting</h2>
            <div className={styles.toggleContainer} style={{position: 'relative'}}>
                <h3>Jitsi</h3>
                <div className={styles.btnsContainer} style={{position: 'absolute'}}><ToggleBtn
                    toggleBtnChange={onToggleBtnHandle}/></div>
                <h3>BigBlueButton</h3>
            </div>

            {auth.id ?
                <></>
                :
                // {/* username */}
                <Input
                    labelText={"User Name"}
                    entity='username' value={urlData.username}
                    setInput={setUrlData} Data={urlData} handleFunction={handleSimpleField}/>
            }

            {/* name */}
            <Input labelText={"Meeting Name"}
                   entity='name' value={urlData.name}
                   setInput={setUrlData} Data={urlData}
                   handleFunction={handleSimpleField}/>


            {urlData.technologyName === Technologies.BBB &&
                <div>
                    {/* attendeePW */}
                    <Input
                        labelText={"Attendee Password"}
                        entity='attendeePW' value={urlData.attendeePW}
                        setInput={setUrlData} Data={urlData} handleFunction={handleSimpleField}/>

                    {/* moderatorPW */}
                    <Input
                        labelText={"Moderator Password"}
                        entity='moderatorPW' value={urlData.moderatorPW} setInput={setUrlData}
                        Data={urlData} handleFunction={handleSimpleField}/>
                </div>
            }


            <div className={styles.btnsContainer}>
                <SubmitButton btnDisabled={btnStatus} btnText={'Create meeting'}/>
            </div>


        </form>
    )
}

export default CreateForm