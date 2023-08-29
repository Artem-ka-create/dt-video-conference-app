import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import styles from './CreateForm.module.css';
import serverConfig from '../data/BBBconfig'

import Input from './UI/Input/Input';
import hex_sha1 from '../libs/paj';

import SubmitButton from './UI/Button/SubmitButton';


function generateMeetingUrl(data,config){


    let createHash ='create';
    let createHttp = createHash + '?';
    let roomSettings = '&allowRequestsWithoutSession=true&meetingExpireIfNoUserJoinedInMinutes=2000&meetingExpireWhenLastUserLeftInMinutes=360';
    let urlBase = `allowStartStopRecording=${data.allowStartStopRecording}&attendeePW=${data.attendeePW}&autoStartRecording=${data.autoStartRecording}&meetingID=${data.name}&moderatorPW=${data.moderatorPW}&name=${data.name}&record=${data.record}`+roomSettings;

    let hashedUrl = createHttp  + urlBase + '&checksum=' + hex_sha1(createHash+urlBase + config.secret);
    console.log(config.url + 'api/' + hashedUrl);
    return config.url + 'api/' + hashedUrl;
  
  }


function CreateForm() {

    const navigate = useNavigate();

    const [urlData, setUrlData] = useState(
        {
          autoStartRecording:false,
          allowStartStopRecording:true,
          record:false,
          username:'',
          attendeePW:'',
          moderatorPW:'',
          // meetingID === name
          meetingID:'',
          name:'',      
        }
      );

    const onSubmitHandler =(event)=>{
        event.preventDefault();
        let result = generateMeetingUrl(urlData,serverConfig)
        console.log('result1',result);
        navigate('./bbb',{ state : {url : result} });
    
        setUrlData(
          {
            autoStartRecording:false,
            allowStartStopRecording:true,
            record:false,
            username:'',
            attendeePW:'',
            moderatorPW:'',
            meetingID:'',
            name:'',      
          }
        );
    };



    
  return (
    
    <form  onSubmit={onSubmitHandler} className={styles.form_container}>
      <h2>Create Meeting</h2>

      {/* username */}
      <Input labelText={"User Name"} entity='username' value={urlData.username} setInput={setUrlData} Data={urlData} />
      {/* attendeePW */}
      <Input labelText={"Attendee Password"} entity='attendeePW' value={urlData.attendeePW} setInput={setUrlData} Data={urlData} />
      {/* moderatorPW */}
      <Input labelText={"Moderator Password"} entity='moderatorPW' value={urlData.moderatorPW} setInput={setUrlData} Data={urlData} />
      {/* name */}
      <Input labelText={"Meeting Name"} entity='name' value={urlData.name} setInput={setUrlData} Data={urlData} />

      {/* <button type='submit' title="Submit" >Create</button> */}
      {/* TODO: Make button optimal component */}
      <SubmitButton/>
      
    </form>
  )
}

export default CreateForm