
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import {http} from 'bigbluebutton-js'
import {createJoinUrl,getMeetingOperation,generateIsMeetingExistsURL,getMeetingIdFromUrl} from '../libs/bbbFunctions'


function BBB() {

    const location = useLocation();
    const [joinUrl, setJoinUrl] = useState('');
    console.log(location);
    const url = location.state.url;


    

    useEffect( ()=> {

        const getData = async () => {
        
          console.log('URL CHECK',url);
            
          if (url.includes('meetingID=')) {
            console.log('URL CHECK',url);
            console.log(getMeetingOperation(url));
            if (getMeetingOperation(url)==='create'){
              const response = await http(url);        
              console.log(response);

              if(response.returncode==='SUCCESS'){
                setJoinUrl( await createJoinUrl(response));
              }else{
                console.warn('CANNOT CREATE MEETING');
              }
            }else if(getMeetingOperation(url)==='join'){
              const response = await http(generateIsMeetingExistsURL(getMeetingIdFromUrl(url)));
              if (response.running===true) {
                setJoinUrl(url);
              }else{
                console.warn('Meeting not started');
              }
           
            }else{
              console.warn('THIS URL OPERATION NOT SUPPORTS');
            }
            
          }else{
            console.warn('WRONG URL');
          }
        
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
        <iframe title='frame' src={joinUrl} width="100%" height="700" 
      allow="geolocation *; microphone *; camera *; display-capture *;"  
      webkitallowfullscreen="false" sandbox="allow-same-origin allow-scripts allow-modals allow-forms" 
      ></iframe>
    }
    </>
  )
}

export default BBB