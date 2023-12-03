import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RegisterForm.module.css';
import SubmitButton from '../UI/Button/SubmitButton';
import Input from '../UI/Input/Input';
import SecretInput from '../UI/Input/SecretInput';
import axios from '../../api/axios';

// eslint-disable-next-line
import { handleSimpleField ,handlePassword, handleEmail } from '../../libs/handleLib';
import {RegisterDTO} from '../../data/Dtos';




function RegisterForm({showToast}) {


  const [btnStatus,SetButtonStatus] = useState(true);
  const [securityField,SetSecurityField] = useState(true);
  const [registerData,SetRegisterData] = useState(RegisterDTO);
  const navigate = useNavigate();

    const onSubmitHandler = ((event)=>{
    
      event.preventDefault();
      

      axios.post("/api/auth/register",registerData,
      {
        headers:{
          "Content-Type":'application/json'},
          
        withCredentials:true
      
      }).then((response)=>{

          console.log('REGISTERED SUCCESSFULLY: {}', response);

          SetSecurityField(true);
          SetRegisterData(RegisterDTO);

          navigate('/signin');

          showToast('success','Great','User registered successfully!',2000);


      }).catch((err)=>{
        if(err?.response){
          showToast('error','Error', 'No server response',2500);
        }else{
        console.warn(err);
          showToast('error','Error', 'Something goes wrong',2500);
        }

      })
    });


  useEffect(()=>{
    if (registerData.username.length>0 && handleSimpleField(registerData.username).length===0 && 
        registerData.name.length>0 && handleSimpleField(registerData.name).length===0 && 
        registerData.surname.length>0 && handleSimpleField(registerData.surname).length===0 && 
        // TODO: change to handlePassword words limit
        registerData.password.length>0 && handlePassword(registerData.password).length===0  &&
        // TODO: change to handleEmail 
        registerData.email.length>0 && handleEmail(registerData.email).length===0
      ){
            
      SetButtonStatus(false);
    }
    else{
      SetButtonStatus(true);
    }
    },[registerData]);

  return (
    <>
    <h2>Register</h2>
      <form  onSubmit={onSubmitHandler} className={styles.form_container}>

        <Input
            labelText={"Username"}
            entity='username' value={registerData.username}
            setInput={SetRegisterData} Data={registerData} handleFunction={handleSimpleField}/>
        <Input
            labelText={"Name"}
            entity='name' value={registerData.name}
            setInput={SetRegisterData} Data={registerData} handleFunction={handleSimpleField}/>
        {/* TODO: change to handleEmail  */}
        <Input
            labelText={"Email"}
            entity='email' value={registerData.email}
            setInput={SetRegisterData} Data={registerData} handleFunction={handleEmail}/>
        <Input
            labelText={"Surname"}
            entity='surname' value={registerData.surname}
            setInput={SetRegisterData} Data={registerData} handleFunction={handleSimpleField}/>


        <SecretInput
            labelText={"Password"}
            entity='password' value={registerData.password}
            setInput={SetRegisterData} Data={registerData} handleFunction={handlePassword} type={'password'} privacyStatus={securityField} setPrivacyStatus={SetSecurityField} />

        <SubmitButton btnDisabled={btnStatus} btnText={"DT Meet Welcome"}/>
      </form>

    </>
  )
}

export default RegisterForm