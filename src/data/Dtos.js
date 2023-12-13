import {Technologies} from './TechData';

export const RegisterDTO = {
    username: '',
    name: '',
    surname: '',
    password: '',
    email: ''
};
export const LoginDTO = {
    email: '',
    password: ''
};
export const JoinMeetingDTO = (username) => {
    let userName = username=== undefined? '':username;
    return {
        url: '',
        username: userName
    }
};
export const CreateMeetingDTO = (username) => {
    let userName = username=== undefined? '':username;

    return {
        autoStartRecording: false,
        allowStartStopRecording: true,
        record: false,
        username: userName,
        attendeePW: '',
        moderatorPW: '',
        // meetingID === name
        meetingID: '',
        name: '',
        technologyName: Technologies.JITSI
    }
};

export const NewRoomDataDTO = {
    meetingName: ''
}