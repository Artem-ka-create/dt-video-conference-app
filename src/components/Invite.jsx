import React, {useEffect, useState} from 'react';
import styles from './Invite.module.css'

import SimpleButton from "./UI/Button/SimpleButton";
import Input from "./UI/Input/Input";
import {handleEmail, handlePassword, handleSimpleField} from "../libs/handleLib";
import SecretInput from "./UI/Input/SecretInput";
import SubmitButton from "./UI/Button/SubmitButton";
import {InviteDTO} from "../data/Dtos";
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import hex_sha1 from "../libs/paj";
import {useNavigate} from "react-router-dom";
import {SECRET_TOKEN, Technologies} from "../data/TechData";
import {axiosPrivate} from "../api/axios";
import axios from "../api/axios"
import useAuth from "../hooks/useAuth";
import {createJoinUrl} from "../libs/bbbFunctions";
import {JitsiConfigData} from "../data/JitsiConfig";


function Invite({showToast}) {


    const [securityField, SetSecurityField] = useState(true);
    const [btnStatus, SetButtonStatus] = useState(true);
    const [noAuthStatus, setNoAuthStatus] = useState(false);

    const {setAuth} = useAuth();


    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();


    const arrowBackIcon = <FontAwesomeIcon icon={faArrowLeft}/>;


    const joinRoom = async (params, isMounted, controller, reqestBody) => {
        try {

            // eslint-disable-next-line
            const response = await axiosPrivate.put(`/api/v1/conferences/join-conference`, {
                signal: controller.signal,
                conferenceName: reqestBody.conferenceName,
                username: reqestBody.username,
                userId: reqestBody.userId
            });

            if (isMounted) {
                console.log("JOIN INvIGTE Response --> ", response)

                // CHECK BBB OR JITSI
                if (params.get('technology') === Technologies.JITSI) {
                    let joinData = {
                        state: {
                            url: `https://${JitsiConfigData.DOMAIN}/` + reqestBody.conferenceName,
                            username: reqestBody.username
                        }
                    };
                    navigate('/join/'+Technologies.JITSI, joinData);
                } else {
                    // create bbb
                    let joinData = {
                        state: {
                            url: await createJoinUrl({meetingID: params.get('conferenceName')}, inputData.username, params.get('password')),
                            username: reqestBody.username
                        }
                    };
                    navigate('/join/'+Technologies.BBB, joinData);
                }

                setInputData(InviteDTO);
                SetButtonStatus(true);
                showToast('success', "Great", "User has been successfully joined");

            }
        } catch (err) {
            console.error(err);
            showToast("error", "Oh", "Something went wrong", 2000);

        }
    }


    const onLoginHandler = (event) => {
        event.preventDefault();


        console.log(inputData);
        setInputData(InviteDTO);
        SetButtonStatus(true);
        console.log(window.location.href);

        axios.post("/api/auth/login", {usernameOrEmail: inputData.email, password: inputData.password},
            {
                headers: {"Content-Type": 'application/json'},
                withCredentials: true
            }).then((response) => {

            console.log(response);

            const accessToken = response?.data?.jwtAuthResponse;
            const id = response?.data?.id;
            const roles = response?.data?.roles;
            const name = response?.data?.name;
            const surname = response?.data?.surname;
            const username = response?.data?.username;
            const email = response?.data?.email;
            const password = response?.data?.password;


            // setAuth from response
            setAuth({username, id, password, email, name, surname, roles, accessToken})
            // setInputDataUsername;
            setInputData({...inputData, [username] : username });

            localStorage.setItem('DTMeetToken', accessToken.accessToken);
            localStorage.setItem('DTMeetUserId', id);

            let currentUrl = new URL(window.location.href);
            const params = new URLSearchParams(new URL(currentUrl).search);

            // prepare BBB requestBody
            let reqestBody = {
                conferenceName: params.get('conferenceName'),
                username: username,
                userId: id
            }

            let isMounted = true;
            const controller = new AbortController();

            showToast('success', 'Great', 'You are in DT Meet', 2000);

            joinRoom(params, isMounted, controller, reqestBody);

            //GOOD
        }).catch((err) => {

            if (err?.response) {
                showToast('error', 'Something went wrong', 'No server response', 2500);
            } else if (err.response?.status === 400) {
                showToast('error', 'Something went wrong', 'Missing Username or Password', 2500);
            } else if (err.response?.status === 401) {
                showToast('error', 'Something went wrong', 'Unauthorized', 2500);
            } else {
                showToast('error', 'Something went wrong', 'Login failed', 2500);
            }
        });

    };


    const onSubmitHandler = async (event) => {
        event.preventDefault();

        let currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(new URL(currentUrl).search);
        let technology = params.get('technology')

        let isMounted = true;
        const controller = new AbortController();

        let reqestBody = {
            conferenceName: params.get('conferenceName'),
            username: inputData.username,
            userId: ''
        }
        if (technology === Technologies.JITSI) {
            // https://jitsi.hamburg.ccc.de/tyujtyy
            // let reqestBody = {
            //     conferenceName: params.get('conferenceName'),
            //     username: inputData.username,
            //     userId: ''
            // }
            joinRoom(params, isMounted, controller, reqestBody);

        } else if (technology === Technologies.BBB) {


            console.log("BBB:JOINURL-->",)


            joinRoom(params, isMounted, controller, reqestBody);

        }


        return () => {
            isMounted = false;
            controller.abort();
        }

    };

    function validateInvitationUrl(currentUrl) {

        const params = new URLSearchParams(new URL(currentUrl).search);
        let checksum = params.get('checksum');
        currentUrl.searchParams.delete('checksum');

        let generatedHex = hex_sha1(currentUrl.toString() + SECRET_TOKEN);

        return generatedHex === checksum;
    }

    function onNoAuthMode() {

        console.log('CLICKED');
        setNoAuthStatus(true);
        setInputData(InviteDTO);

    }

    const [inputData, setInputData] = useState(InviteDTO)

    useEffect(() => {

        const isEmailValid = inputData.email.length > 0 && handleEmail(inputData.email).length === 0;
        const isPasswordValid = inputData.password.length > 0 && handlePassword(inputData.password).length === 0;
        const isUsernameValid = inputData.username.length > 0 && handleSimpleField(inputData.username).length === 0;

        const isValid = (!noAuthStatus && isEmailValid && isPasswordValid) || (noAuthStatus && isUsernameValid);

        SetButtonStatus(!isValid);

    }, [inputData, noAuthStatus]);

    return (
        <div className={styles.invite_container}>

            {validateInvitationUrl(new URL(window.location.href)) ?

                <>
                    {noAuthStatus === true ?
                        <div style={{width: '45vw'}}>

                            <div className={styles.back_btn_container}>

                                <Button label={arrowBackIcon} className={styles.back_btn}
                                        onClick={() => setNoAuthStatus(false)}/>
                            </div>


                            <form onSubmit={onSubmitHandler} style={{width: '45vw'}}>
                                <Input
                                    labelText={"Username"}
                                    entity='username' value={inputData.username}
                                    setInput={setInputData} Data={inputData} handleFunction={handleSimpleField}/>

                                <SubmitButton btnDisabled={btnStatus} btnText={"Connect"}/>
                            </form>
                        </div>

                        :

                        <>
                            <form onSubmit={onLoginHandler} style={{width: '45vw'}}>
                                <h2>Login</h2>

                                <Input
                                    labelText={"Login"}
                                    entity='email' value={inputData.email}
                                    setInput={setInputData} Data={inputData} handleFunction={handleEmail}/>

                                <SecretInput
                                    labelText={"Password"}
                                    entity='password' value={inputData.password}
                                    setInput={setInputData} Data={inputData} handleFunction={handlePassword}
                                    type={'password'}
                                    privacyStatus={securityField} setPrivacyStatus={SetSecurityField}/>

                                <SubmitButton btnDisabled={btnStatus} btnText={"Connect"}/>
                            </form>

                            <div className={styles.separator}>
                                <div className={styles.separator_line}></div>
                                <div className={styles.separator_text}>or</div>
                                <div className={styles.separator_line}></div>
                            </div>
                            <SimpleButton btnText={'Connect without auth'} hadleButtonFunction={onNoAuthMode}/>

                        </>

                    }
                </>
                :
                <h1>Wrong invite link, contact to administrator</h1>
            }


        </div>
    );
}

export default Invite;