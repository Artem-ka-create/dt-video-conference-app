import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';

import SubmitButton from '../UI/Button/SubmitButton'
import Input from '../UI/Input/Input'
import styles from './JoinForm.module.css'
import { handleSimpleField, handleUrl } from '../../libs/handleLib';
import {JoinMeetingDTO} from '../../data/Dtos';

// TODO: disable usernameimput if authorized

function JoinForm({onChangePanel}) {
    const navigate = useNavigate();
    const [btnStatus,SetButtonStatus] = useState(true);


    const [data,setData] = useState(JoinMeetingDTO);
    const onSubmitHandler =(event)=>{
        event.preventDefault();
        // check by domains technology
        let result = {state :{url : data.url, username: data.username}};

        if(data.url.replace('https://','').split('/')[0]==='jitsi.hamburg.ccc.de'){
          navigate('./jitsi',result);
        }
        else if(data.url.replace('https://','').split('/')[1]==='bigbluebutton'){
          navigate('./bbb',result);
        }
        else{
          alert(' This url not supports')
        }
        onChangePanel(false)

        setData(JoinMeetingDTO);
    };

    useEffect(()=>{

    if (data.username.length>0 && handleSimpleField(data.username).length===0 && 
      data.url.length>0 && handleUrl(data.url).length===0){
          
      SetButtonStatus(false);
    }else{
      SetButtonStatus(true);
    }
    },[data])

  return (
    <>
    <h2>JoinForm</h2>
    
    <form  onSubmit={onSubmitHandler} className={styles.form_container}>
        <Input labelText={"Username"} entity='username' value={data.username} setInput={setData} Data={data} handleFunction={handleSimpleField} />
        <Input labelText={"Url"} entity='url' value={data.url} setInput={setData} Data={data} handleFunction={handleUrl} />
        
        <SubmitButton btnDisabled={btnStatus} btnText={'Join to meeting'}/>
    </form>
    </>
  )
}

export default JoinForm