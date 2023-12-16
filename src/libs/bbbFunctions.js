import serverConfig from '../data/BBBconfig'
import hex_sha1 from './paj'

export function generateMeetingUrl(data){

    let createHash ='create';
    let createHttp = createHash + '?';
    let roomSettings = '&allowRequestsWithoutSession=true&meetingExpireIfNoUserJoinedInMinutes=2000&meetingExpireWhenLastUserLeftInMinutes=360';
    // let urlBase = `allowStartStopRecording=${data.allowStartStopRecording}&attendeePW=${data.attendeePW}&autoStartRecording=${data.autoStartRecording}&meetingID=${data.name}&moderatorPW=${data.moderatorPW}&name=${data.name}&record=${data.record}`+roomSettings;
  let urlBase = `allowStartStopRecording=true&attendeePW=${data.attendeePW}&autoStartRecording=false&meetingID=${data.name}&moderatorPW=${data.moderatorPW}&name=${data.name}&record=false`+roomSettings;

    let hashedUrl = createHttp  + urlBase + '&checksum=' + hex_sha1(createHash+urlBase + serverConfig.secret);
    return serverConfig.url + 'api/' + hashedUrl;
  }

  export function setNewUsernameToUrl(url, username){
    let param = url.split('bigbluebutton/api/join?')[1].split('&')[0];

    let domain = url.split('bigbluebutton/api/join?')[0]
    let base = url.split('bigbluebutton/api/join?')[1].split('&checksum=')[0].replace(param,`fullName=${username}`)
    
    return domain + 'bigbluebutton/api/join?'+ base + '&checksum='+ hex_sha1('join'+base+serverConfig.secret); 
  }
  export async function createJoinUrl (data,username,password){
      
    console.log(data);

    let joinUrlBaseUser = `fullName=${username}&meetingID=${data.meetingID}&password=${password}&redirect=true`;
    // let joinUrlBaseAtendee = `fullName=${username}&meetingID=${data.meetingID}&password=${password}&redirect=true`;
  
    let operation = 'join';
    let urlOperation = operation + '?'
    let hashedUrlUser = urlOperation + joinUrlBaseUser + '&checksum=' + hex_sha1(operation+joinUrlBaseUser + serverConfig.secret);
    // let hashedUrlAttendee = urlOperation + joinUrlBaseAtendee + '&checksum=' + hex_sha1(operation+joinUrlBaseAtendee + serverConfig.secret);
    // console.log('ATTENDEE',serverConfig.url + 'api/' + hashedUrlAttendee);
  
    return serverConfig.url + 'api/' + hashedUrlUser;
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