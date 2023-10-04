import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import styles from './CreateForm.module.css';
import Input from '../UI/Input/Input';
import SubmitButton from '../UI/Button/SubmitButton';
import ToggleBtn from '../UI/Toggle/ToggleBtn';
import {generateMeetingUrl} from '../../libs/bbbFunctions';
import {Technologies} from '../../data/TechData';
import FormAlert from '../UI/FormAlert/FormAlert';



function CreateForm({onChangePanel}) {

  const [exception, setException] = useState(false);
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
          technologyName:Technologies.JITSI              
        }
      );

      function onToggleBtnHandle(event){
        console.log(event);
        let result = event ? Technologies.BBB :Technologies.JITSI
        // eslint-disable-next-line
        setUrlData({...urlData, ['technologyName'] : result })
        console.log(urlData);
      }

    const onSubmitHandler =(event)=>{
        event.preventDefault();
        let result = '';
        console.log(urlData.technologyName);
        if (urlData.technologyName===Technologies.JITSI){
          
          result = 'https://8x8.vc/' + urlData.name;
          console.log(result);
        }
        else if(urlData.technologyName===Technologies.BBB){
          result = generateMeetingUrl(urlData)
        }
        
        navigate(`./${urlData.technologyName}`,{ state : {url : result, username: urlData.username,attendeePW: urlData.attendeePW, moderatorPW: urlData.moderatorPW  } });
        onChangePanel(false)
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
            technologyName:Technologies.JITSI         
          }
        );
    };
    
  return (
    
    <form  onSubmit={onSubmitHandler} className={styles.form_container}>
      <h2>Create Meeting</h2>
      <div className={styles.toggleContainer} style={{position:'relative'}}>
        <h3>Jitsi</h3>
      <div className={styles.btnsContainer} style={{position:'absolute'}}> <ToggleBtn toggleBtnChange={onToggleBtnHandle}/> </div>
        <h3>BigBlueButton</h3>
      </div>

      {/* username */}
      <Input labelText={"User Name"} entity='username' value={urlData.username} setInput={setUrlData} Data={urlData} />
      { urlData.technologyName===Technologies.BBB && 
        <div>
          {/* attendeePW */}
          <Input labelText={"Attendee Password"} entity='attendeePW' value={urlData.attendeePW} setInput={setUrlData} Data={urlData} />
          {/* moderatorPW */}
          <Input labelText={"Moderator Password"} entity='moderatorPW' value={urlData.moderatorPW} setInput={setUrlData} Data={urlData} />
        </div>
      } 
      <div onClick={()=> setException(!exception)}>Exception test</div>

      {/* name */}
      <Input labelText={"Meeting Name"} entity='name' value={urlData.name} setInput={setUrlData} Data={urlData} />

      <FormAlert exceptionStatus={exception}/>

      <div className={styles.btnsContainer}>
        <SubmitButton/>
      </div>
      
      
    </form>
  )
}

export default CreateForm