import serverConfig from '../data/BBBconfig'
import hex_sha1 from './paj'

export function generateMeetingUrl(data){

    let createHash ='create';
    let createHttp = createHash + '?';
    let roomSettings = '&allowRequestsWithoutSession=true&meetingExpireIfNoUserJoinedInMinutes=2000&meetingExpireWhenLastUserLeftInMinutes=360';
    let urlBase = `allowStartStopRecording=${data.allowStartStopRecording}&attendeePW=${data.attendeePW}&autoStartRecording=${data.autoStartRecording}&meetingID=${data.name}&moderatorPW=${data.moderatorPW}&name=${data.name}&record=${data.record}`+roomSettings;

    let hashedUrl = createHttp  + urlBase + '&checksum=' + hex_sha1(createHash+urlBase + serverConfig.secret);
    // console.log(serverConfig.url + 'api/' + hashedUrl);
    return serverConfig.url + 'api/' + hashedUrl;
  
  }

  export async function createJoinUrl (data){
      
    console.log(data);
    let joinUrlBaseModerator = `fullName=ADMIN&meetingID=${data.meetingID}&password=${data.moderatorPW}&redirect=true`;
    let joinUrlBaseAtendee = `fullName=ATTENDEE&meetingID=${data.meetingID}&password=ap&redirect=true`;
  
    let operation = 'join';
    let urlOperation = operation + '?'
    let hashedUrlModerator = urlOperation + joinUrlBaseModerator + '&checksum=' + hex_sha1(operation+joinUrlBaseModerator + serverConfig.secret);
    let hashedUrlAttendee = urlOperation + joinUrlBaseAtendee + '&checksum=' + hex_sha1(operation+joinUrlBaseAtendee + serverConfig.secret);
    console.log('ATTENDEE',serverConfig.url + 'api/' + hashedUrlAttendee);
  
    console.log(serverConfig.podUrl + 'api/' + hashedUrlModerator);
  
    return serverConfig.url + 'api/' + hashedUrlModerator;
  }
  
  export function generateIsMeetingExistsURL(meetingId){

    let operation = 'isMeetingRunning'
    let urlOperation = operation + '?';
    let IsMeetingEsxistsBase = `meetingID=${meetingId}`;
    let hashedUrl = urlOperation + IsMeetingEsxistsBase + '&checksum=' + hex_sha1(operation+IsMeetingEsxistsBase + serverConfig.secret);
  
    return serverConfig.url + 'api/' + hashedUrl;
  }
  export function getMeetingIdFromUrl(url){
    let paramsArray = url.split('&');
    let idParam = paramsArray.filter((item)=> item.includes('meetingID'));
    let value = idParam[0].split('=')[1];
    return value;
  }
  export function getMeetingOperation(url){
    return url.replace(serverConfig.url+'api/','').split('?')[0];
  }