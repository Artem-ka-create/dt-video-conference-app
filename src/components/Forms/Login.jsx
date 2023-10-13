import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import SubmitButton from '../UI/Button/SubmitButton';
import Input from '../UI/Input/Input';
import { handleSimpleField ,handlePassword } from '../../libs/handleLib';

function Login() {
  const [btnStatus,SetButtonStatus] = useState(true);
  const navigate = useNavigate();
  

  const [loginData,SetLoginData]=useState(
    {
      email:'',
      password:''
    });


  const onSubmitHandler =((event)=>{

    event.preventDefault();

    SetLoginData(
      {
        email:'',
        password:''
      }
    );
  });



  useEffect(()=>{

    if (loginData.email.length>0 && handleSimpleField(loginData.email).length===0 && 
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

    <Input 
        labelText={"Password"} 
        entity='password' value={loginData.password} 
        setInput={SetLoginData} Data={loginData} handleFunction={handlePassword} type={'password'} />
    
    <SubmitButton btnDisabled={btnStatus} btnText={"Sign In"}/>


    </form>


    
    </>

  )
}

export default Login