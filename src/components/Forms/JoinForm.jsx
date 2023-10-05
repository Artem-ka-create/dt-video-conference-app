import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import SubmitButton from '../UI/Button/SubmitButton'
import Input from '../UI/Input/Input'
import styles from './JoinForm.module.css'
import { handleNameField, handleUrl } from '../../libs/handleLib';

function JoinForm({onChangePanel}) {
    const navigate = useNavigate();


    const [data,setData] = useState({url:'',username:''});
    const onSubmitHandler =(event)=>{
        event.preventDefault();
        // check by domains technology
        let result = {state :{url : data.url, username: data.username}};

        if(data.url.replace('https://','').split('/')[0]==='8x8.vc'){
          navigate('./jitsi',result);
        }
        else if(data.url.replace('https://','').split('/')[1]==='bigbluebutton'){
          navigate('./bbb',result);
        }
        else{
          alert(' This url not supports')
        }
        onChangePanel(false)

        setData({url:'',username:''});
    };

  return (
    <>
    <h2>JoinForm</h2>
    
    <form  onSubmit={onSubmitHandler} className={styles.form_container}>
        <Input labelText={"Username"} entity='username' value={data.username} setInput={setData} Data={data} handleFunction={handleNameField} />
        <Input labelText={"Url"} entity='url' value={data.url} setInput={setData} Data={data} handleFunction={handleUrl} />
        <SubmitButton/>
    </form>
    </>
  )
}

export default JoinForm