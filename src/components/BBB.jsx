
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import {http} from 'bigbluebutton-js'
import {createJoinUrl,getMeetingOperation,generateIsMeetingExistsURL,getMeetingIdFromUrl} from '../libs/bbbFunctions'
import styles from './UI/Button/UrlButton.module.css';

function BBB() {

    const location = useLocation();
    const [joinUrl, setJoinUrl] = useState('');
    console.log(location);
    // const url = location.state.url;
    // const username = location.state.username;
    const[attendeeURL,setAttendeeURL] = useState('');
    const[moderatorURL,setModeratorURL] = useState('');

    const {url , username, attendeePW , moderatorPW} = location.state;
    const [operation,setOperation] = useState('');

    useEffect( ()=> {
        const getData = async () => {
          console.log('URL CHECK',url);
            
          if (url.includes('meetingID=')) {
            console.log('URL CHECK',url);
            const op = getMeetingOperation(url);
            setOperation(getMeetingOperation(url))

            if (op==='create'){
              const response = await http(url);      

              if(response.returncode==='SUCCESS'){
                setAttendeeURL(await createJoinUrl(response,'AttendeeUSERNAME',attendeePW))
                setModeratorURL(await createJoinUrl(response,'ModeratorUSERNAME',moderatorPW))

                setJoinUrl( await createJoinUrl(response,username,moderatorPW));

              }
              else alert('CANNOT CREATE MEETING');

            }else if(op==='join'){
              const response = await http(generateIsMeetingExistsURL(getMeetingIdFromUrl(url)));
              if (response.running===true) {
                setJoinUrl(url);
              }
              else alert('Meeting not started');
           
            }
            else alert('THIS URL OPERATION NOT SUPPORTS');
            
          }
          else alert('WRONG URL');        
          };
        
          getData();
        
          },
          // [url]
          );
        


  return (
   
    <>
    { 
      joinUrl.length === 0 ?
        <div>BBB</div>:
        <iframe style={{marginTop:'30px'}} title='frame' src={joinUrl} width="100%" height="500" 
      allow="geolocation *; microphone *; camera *; display-capture *;"  
      webkitallowfullscreen="false" sandbox="allow-same-origin allow-scripts allow-modals allow-forms" 
      ></iframe>
    }
    {operation==='create' && 
    <>
      {/* <h3>CREATE </h3> */}

      <div className={styles.urlContainer}>
      <button className={styles.urlButton} onClick={()=> navigator.clipboard.writeText(attendeeURL)}>Copy Attendee join URL</button>
      <button className={styles.urlButton} onClick={()=> navigator.clipboard.writeText(moderatorURL)}>Copy Moderator join URL</button>
      </div>



    </>
    }
    {operation==='join' && <h2>JOIN</h2>}


    </>
  )
}

export default BBB