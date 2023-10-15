

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
    if(url.replace('https://','').split('/')[0]==='8x8.vc'|| 
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
    console.log(emailValidation(text));
    return emailValidation(text) && text.length>3 ? '' : exceptionText;
}

export function handleUrl(text){
    console.log(text);

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

    