
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import serverConfig from '../data/BBBconfig'
import hex_sha1 from '../libs/paj'
import {http} from 'bigbluebutton-js'


function BBB() {

    const location = useLocation();
    const [joinUrl, setJoinUrl] = useState('');
    console.log(location);
    const url = location.state.url;


    function generateIsMeetingExistsURL(meetingId){

        let operation = 'isMeetingRunning'
        let urlOperation = operation + '?';
        let IsMeetingEsxistsBase = `meetingID=${meetingId}`;
        let hashedUrl = urlOperation + IsMeetingEsxistsBase + '&checksum=' + hex_sha1(operation+IsMeetingEsxistsBase + serverConfig.secret);
      
        return serverConfig.url + 'api/' + hashedUrl;
      }
      function getMeetingIdFromUrl(url){
        let paramsArray = url.split('&');
        let idParam = paramsArray.filter((item)=> item.includes('meetingID'));
        let value = idParam[0].split('=')[1];
        return value;
      }
      function getMeetingOperation(url){
        return url.replace(serverConfig.url+'api/','').split('?')[0];
      }
      async function createJoinUrl (response){
      
        console.log('This is in async function');
        console.log(response);
        let joinUrlBaseModerator = `fullName=ADMIN&meetingID=${response.meetingID}&password=${response.moderatorPW}&redirect=true`;
        let joinUrlBaseAtendee = `fullName=ATTENDEE&meetingID=${response.meetingID}&password=ap&redirect=true`;
      
        let operation = 'join';
        let urlOperation = operation + '?'
        let hashedUrlModerator = urlOperation + joinUrlBaseModerator + '&checksum=' + hex_sha1(operation+joinUrlBaseModerator + serverConfig.secret);
        let hashedUrlAttendee = urlOperation + joinUrlBaseAtendee + '&checksum=' + hex_sha1(operation+joinUrlBaseAtendee + serverConfig.secret);
        console.log('ATTENDEE',serverConfig.url + 'api/' + hashedUrlAttendee);
      
        console.log(serverConfig.podUrl + 'api/' + hashedUrlModerator);
      
        return serverConfig.url + 'api/' + hashedUrlModerator;
      }


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