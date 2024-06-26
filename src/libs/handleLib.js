import {Technologies} from "../data/TechData";
import {JitsiConfigData} from "../data/JitsiConfig";


function specialSymbolsCheck(text){
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;    // eslint-disable-line
    return format.test(text)
}
function emailValidation(text){
    var format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return format.test(text) 
}

function isUrl(url) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}
function urlSupport(url){
    if(url.replace('https://','').split('/')[0]===JitsiConfigData.DOMAIN||
        url.replace('https://','').split('/')[1]==='bigbluebutton'){
        return true;
      }
     
      else{
        return false;
      }
}

export function handleSimpleField(text,labelText){

    let exceptionText=labelText + " has to include more than 3 symbols, no special symbols";
    
    if (text.length>=3 && !specialSymbolsCheck(text)){
        return'';
    }
    return exceptionText;
}


export function handlePassword(text,labelText){
    let exceptionText=labelText + " has to include more than 8 symbols";
    
    if (text.length >= 3){
        return'';
    }
    return exceptionText;
}

export function handleEmail(text,labelText){
    let exceptionText="Field has to be an email";
    // console.log(emailValidation(text));
    return emailValidation(text) && text.length>3 ? '' : exceptionText;
}

export function handleUrl(text){
    // console.log(text);

    const notValidUrlMessage = 'This url is not valid, check yours url';
    const notSupportsUrlMessage = 'This url doesn\'t supports by this application';

    if (isUrl(text)){
        if (urlSupport(text)){
            return '';
        }else{
            return notSupportsUrlMessage;
        }
    }
    else{
        return notValidUrlMessage;
    }

}

export function handleCreateFormDataNotAuth (data){
    if (data.technologyName === Technologies.JITSI &&
        data.name.length > 0 && handleSimpleField(data.name).length === 0 &&
        data.username.length > 0 && handleSimpleField(data.username).length === 0) {

        return false;
    } else if (data.technologyName === Technologies.BBB &&
        data.name.length > 0 && handleSimpleField(data.name).length === 0 &&
        data.username.length > 0 && handleSimpleField(data.username).length === 0 &&
        data.attendeePW.length > 0 && handleSimpleField(data.attendeePW).length === 0 &&
        data.moderatorPW.length > 0 && handleSimpleField(data.moderatorPW).length === 0) {

        return false;
    } else {
        return true;
    }
}
export function handleCreateFormDataAuth (data){
    if (data.technologyName === Technologies.JITSI &&
        data.name.length > 0 && handleSimpleField(data.name).length === 0) {
        return false;
    } else if (data.technologyName === Technologies.BBB &&
        data.name.length > 0 && handleSimpleField(data.name).length === 0 &&
        data.attendeePW.length > 0 && handleSimpleField(data.attendeePW).length === 0 &&
        data.moderatorPW.length > 0 && handleSimpleField(data.moderatorPW).length === 0) {
        return false;
    } else {
        return true;
    }
}

export function handleJoinFormDataNotAuth (data){
    if (data.username.length > 0 && handleSimpleField(data.username).length === 0 &&
        data.url.length > 0 && handleUrl(data.url).length === 0) {

        return false;
    } else {
        return true;
    }
}
export function handleJoinFormDataAuth (data){
    if (data.url.length > 0 && handleUrl(data.url).length === 0) {
        return false;
    } else {
        return true;
    }
}

    