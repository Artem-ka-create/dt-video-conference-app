import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import styles from './CreateForm.module.css';
import Input from './UI/Input/Input';
import {generateMeetingUrl} from '../libs/bbbFunctions';

import SubmitButton from './UI/Button/SubmitButton';
import ToggleBtn from './UI/Toggle/ToggleBtn';


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
        let result = generateMeetingUrl(urlData)
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

      <div className={styles.toggleContainer}>
        <h3>Jitsi</h3>
        <h3>BigBlueButton</h3>
      </div>

      <div className={styles.btnsContainer}>
        <ToggleBtn/>
        {/* <button type='submit' title="Submit" >Create</button> */}
        {/* TODO: Make button optimal component */}
        <SubmitButton/>
      </div>
      
      
    </form>
  )
}

export default CreateForm