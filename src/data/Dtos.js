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
export const JoinMeetingDTO = {
    url: '',
    username: ''
};
export const CreateMeetingDTO = (username) => {
    return {
        autoStartRecording: false,
        allowStartStopRecording: true,
        record: false,
        username: username,
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