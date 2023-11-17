import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RegisterForm.module.css';
import SubmitButton from '../UI/Button/SubmitButton';
import Input from '../UI/Input/Input';
import SecretInput from '../UI/Input/SecretInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from '../../api/axios';

// eslint-disable-next-line
import { handleSimpleField ,handlePassword, handleEmail } from '../../libs/handleLib';
import {RegisterDTO} from '../../data/Dtos';
import SimpleButton from '../UI/Button/SimpleButton';



function RegisterForm() {


  const [btnStatus,SetButtonStatus] = useState(true);
  const [securityField,SetSecurityField] = useState(true);
  const [registerData,SetRegisterData] = useState(RegisterDTO);
  const navigate = useNavigate();
  const [submit,setSubmit] = useState(false);
  // eslint-disable-next-line
  const [successStatus,setSuccessStatus] = useState(false);


    const onSubmitHandler = ((event)=>{
    
      event.preventDefault();
      

      axios.post("/api/auth/register",registerData,
      {
        headers:{
          "Content-Type":'application/json'},
          
        withCredentials:true
      
      }).then((response)=>{
          console.log(response);
          console.log('REGISTERED SUCCESSFULLY: {}');
          setSubmit(true);
          SetSecurityField(true);
          SetRegisterData(RegisterDTO);
          setSuccessStatus(true);
      }).catch((err)=>{
        if(err?.response){

          console.warn("NO server response");
        }else{
        console.warn(err);
        }
        setSuccessStatus(false);

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
    const handleButtonClick = ()=> navigate('/signin');

  return (
    <>
    <h2>Register</h2>
    
    {/* TODO: finish submit checkBox */}
    {submit ? 
    <div>
      {successStatus ?
      <div className={`${styles.checkCircle} ${styles.success}`}>
        <FontAwesomeIcon icon={faCircleCheck} />
        <SimpleButton hadleButtonFunction={handleButtonClick} btnText = {'Sign in'} />
      </div>
      
      : 
      <div className={`${styles.checkCircle} ${styles.failure}`}>
        <FontAwesomeIcon icon={faCircleXmark} />
        <SimpleButton hadleButtonFunction={handleButtonClick} btnText = {'Sign in'} />
      </div>
      }
      
    </div> 
      : 
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
    }


    </>
  )
}

export default RegisterForm