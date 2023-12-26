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


function Invite() {


    const [securityField, SetSecurityField] = useState(true);
    const [btnStatus, SetButtonStatus] = useState(true);
    const [noAuthStatus, setNoAuthStatus] = useState(false);

    const arrowBackIcon = <FontAwesomeIcon icon={faArrowLeft}/>;

    const onLoginHandler = (event) => {
        event.preventDefault();

        console.log(inputData);
        setInputData(InviteDTO);
        SetButtonStatus(true);
    };

    const onNoAuthHandler =(event) => {
        event.preventDefault();

        console.log(inputData);
        setInputData(InviteDTO);
        SetButtonStatus(true);

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


            {noAuthStatus === true ?
                <div style={{width: '45vw'}}>

                    <div className={styles.back_btn_container}>

                        <Button label={arrowBackIcon} className={styles.back_btn}
                                onClick={() => setNoAuthStatus(false)}/>
                    </div>


                    <form onSubmit={onNoAuthHandler} style={{width: '45vw'}}>
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
                            setInput={setInputData} Data={inputData} handleFunction={handlePassword} type={'password'}
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


        </div>
    );
}

export default Invite;