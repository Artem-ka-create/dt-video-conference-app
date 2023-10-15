import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import SubmitButton from '../UI/Button/SubmitButton';
import Input from '../UI/Input/Input';
import SecretInput from '../UI/Input/SecretInput';
import { handleSimpleField ,handlePassword } from '../../libs/handleLib';
import {LoginDTO} from '../../data/Dtos';

function Login() {
  const [btnStatus,SetButtonStatus] = useState(true);
  const [securityField,SetSecurityField] = useState(true);
  const navigate = useNavigate();
  

  const [loginData,SetLoginData]=useState(LoginDTO);


  const onSubmitHandler =((event)=>{

    event.preventDefault();
    SetSecurityField(true);
    SetLoginData(LoginDTO);

  });
  const handleSignUp = () =>{navigate('/register');};

  useEffect(()=>{

    console.log(loginData);
    if (loginData.email.length>0 && handleSimpleField(loginData.email).length===0 && 
    // TODO: change to handlePassword words limit
    loginData.password.length>0 && handlePassword(loginData.password).length===0){
          
      SetButtonStatus(false);
    }
    else{
      SetButtonStatus(true);
    }
    },[loginData]);



  return (
    <>

    <h2>Login</h2>
    <form  onSubmit={onSubmitHandler} className={styles.form_container}>


    <Input 
        labelText={"Login"} 
        entity='email' value={loginData.email} 
        setInput={SetLoginData} Data={loginData} handleFunction={handleSimpleField}/>

    <SecretInput 
        labelText={"Password"} 
        entity='password' value={loginData.password} 
        setInput={SetLoginData} Data={loginData} handleFunction={handlePassword} type={'password'} privacyStatus={securityField} setPrivacyStatus={SetSecurityField} />
    
    <SubmitButton btnDisabled={btnStatus} btnText={"Sign In"}/>

    <div className={styles.registerContainer}>
      <div>
        New to DT Meet ? 
      </div>
      <div onClick={handleSignUp} className={styles.noStyleBtn}>
        Sign_Up
      </div>
    </div>


    </form>


    
    </>

  )
}

export default Login