

function specialSymbolsCheck(text){
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;    // eslint-disable-line
    return format.test(text)
}

export function handleNameField(text,labelText){
    // console.log(text);
    let exceptionText=labelText + " has to include more than 3 symbols, no special symbols";

    
    if (text.length>=3 && !specialSymbolsCheck(text)){
    console.log(text);

        return'';
    }
    return exceptionText;
}

export function handleLogin(text){
    console.log(text);
}

export function handleBBBPassword(text){
    console.log(text);
}

export function handlePassword(text){
    console.log(text);
}

export function handleEmail(text){
    console.log(text);
}

export function handleUrl(text){
    console.log(text);

}