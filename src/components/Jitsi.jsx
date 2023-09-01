import React, { useEffect, useState } from 'react';
import styles from './UI/Toggle/ToolBarButtons.module.css'
import urlStyles from './UI/Button/UrlButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophone,faMicrophoneSlash, faVideo, faVideoSlash, faPhoneSlash , faHand, faComment,faCommentSlash, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import {faHand as faHandreg  } from '@fortawesome/free-regular-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";



function Jitsi() {
  
  const [state, setState] = useState({
      isAudioMuted: false,
      isVideoMuted: false,
      isRaiseHand: false,
      isChatShown: false
    }
  );
  // const history = useHistory();
  const formData = useLocation().state;
  const navigate = useNavigate();

  const [API, setAPI] = useState();

  const startMeeting = ()=> {

      const handleClose = () => {
        console.log("handleClose");
      }
      
      const handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        // const data = await this.getParticipants();
      }
      
      const handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        // const data = await this.getParticipants();
      }
      
      const handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        // const data = await this.getParticipants();
      }
      
      const handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        
        navigate('/');

      }
      
      const handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
      }
      
      const handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
      }
      
      
      var api = new window.JitsiMeetExternalAPI("8x8.vc", {
        roomName: formData.url.replace('https://8x8.vc/',''),
        parentNode: document.querySelector('#jaas-container'),
        configOverwrite: {
          prejoinConfig: { enabled: false }, toolbarButtons: ['closedcaptions', 'fullscreen',
          'fodeviceselection', 'profile', 'recording',
          'livestreaming', 'etherpad', 'settings',
          'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
          'tileview']
        },
        
        width: '100%',
        height: 500,
        userInfo: {
          displayName: formData.username
        }
        // Make sure to include a JWT if you intend to record,
        // make outbound calls or use any other premium features!
        // jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTI4NjRiZTI0NDRkNDY5YjkwZTI5Zjg5MWEwZjRhNjIvODE2MDg3LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2OTM0Mjc0MzIsImV4cCI6MTY5MzQzNDYzMiwibmJmIjoxNjkzNDI3NDI3LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZTI4NjRiZTI0NDRkNDY5YjkwZTI5Zjg5MWEwZjRhNjIiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwic2lwLW91dGJvdW5kLWNhbGwiOmZhbHNlLCJ0cmFuc2NyaXB0aW9uIjpmYWxzZSwicmVjb3JkaW5nIjpmYWxzZX0sInVzZXIiOnsiaGlkZGVuLWZyb20tcmVjb3JkZXIiOmZhbHNlLCJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJUZXN0IFVzZXIiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTAwNzIzNDUyMTc1NjQzMjM4MjA2IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ0ZXN0LnVzZXJAY29tcGFueS5jb20ifX0sInJvb20iOiIqIn0.dgxNyg9eTpsbPoCH4TaXSRoEUs9ObS-L8YKtY3yLJK1iKPSz7OYIJ1f3Hoo7_gPC9_gkAela7Wy_vizCC7NnTzVbKzU7je5LK4Mrznzv7mgYAHwCImHzCdg17PXInm8RTDqq1LC4Mq9J7W0dQNNzg9s9fUFqqAq-Sd3AY3g1DzxXLRFXuigz092sdh67komWCk55jf9Rvdi0UlOMydCApHQcTf0rZ9OAwTlfwFGWyTAvKUj3KSj2Xabuf5bpd948HCuXhVBgza4ypyMejL5LUzF0sCalGov08Epyp7r0-xJzKzFFrM5awrn0iPxLLNSaGqzJC1zkh8prp5trXER5kQ"
      });
      api.addEventListeners({
        readyToClose: handleClose,
        participantLeft: handleParticipantLeft,
        participantJoined: handleParticipantJoined,
        videoConferenceJoined: handleVideoConferenceJoined,
        videoConferenceLeft: handleVideoConferenceLeft,
        audioMuteStatusChanged: handleMuteStatus,
        videoMuteStatusChanged: handleVideoStatus
      });

      setAPI(api);
  };

  function executeCommand(command) {
    API.executeCommand(command);
    if (command === 'hangup') {
      navigate('/');
    }

    if (command === 'toggleAudio') {
      console.log('AUDIOBTN');
      // eslint-disable-next-line
      setState({ ...state, ['isAudioMuted']: !state.isAudioMuted })
    }
    if (command === 'toggleVideo') {
      // eslint-disable-next-line
      setState({ ...state, ['isVideoMuted']: !state.isVideoMuted })
    }
    if (command === 'toggleRaiseHand') {
      // eslint-disable-next-line
      setState({ ...state, ['isRaiseHand']: !state.isRaiseHand })

    }
    if (command === 'toggleChat') {
      // eslint-disable-next-line
      setState({ ...state, ['isChatShown']: !state.isChatShown })

    }
  }

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      startMeeting();
    } else {
      alert('JitsiMeetExternalAPI not loaded');
  }
  // eslint-disable-next-line
  },[]);


  return (
    <div className="App">
      <div style={{marginTop:'30px'}} id="jaas-container" />
      
      <span>&nbsp;&nbsp;</span>
      <button className={styles.btn} onClick={() => executeCommand('toggleAudio')} title="Mute / Unmute">
        {state.isAudioMuted ? <FontAwesomeIcon icon={faMicrophone} /> : <FontAwesomeIcon icon={faMicrophoneSlash} />}
      </button>

      <button className={styles.btn} onClick={() => executeCommand('toggleVideo')} title="Start / Stop camera">
        {state.isVideoMuted ? <FontAwesomeIcon icon={faVideoSlash} />   : < FontAwesomeIcon icon={faVideo} />}
      </button>
      <button className={styles.btn} onClick={() => executeCommand('toggleRaiseHand')} title="Rise your hand">
        {state.isRaiseHand ? <FontAwesomeIcon icon={faHandreg} /> : <FontAwesomeIcon icon={faHand} />}
      </button>
      <button className={styles.btn} onClick={() => executeCommand('toggleShareScreen')} title="Share your screen">
        <FontAwesomeIcon icon={faShareFromSquare} />
      </button>
      <button className={styles.btn} onClick={() => executeCommand('toggleChat')} title="Show chat">
        {state.isChatShown ? <FontAwesomeIcon icon={faCommentSlash} /> : <FontAwesomeIcon icon={faComment} />}
      </button>
      <button className={styles.btn_hangUp} onClick={() => executeCommand('hangup')} title="Leave">
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>

      <div className={urlStyles.urlContainer}>
      <button className={urlStyles.urlButton} onClick={()=> navigator.clipboard.writeText(formData.url)}>Copy join URL</button>
      </div>

    </div>
  );
}

export default Jitsi