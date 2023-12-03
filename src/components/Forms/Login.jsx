import React,{useState,useEffect } from 'react';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {useNavigate,useLocation} from 'react-router-dom';
import styles from './Login.module.css';
import SubmitButton from '../UI/Button/SubmitButton';
import Input from '../UI/Input/Input';
import SecretInput from '../UI/Input/SecretInput';
import { handlePassword, handleEmail } from '../../libs/handleLib';
import {LoginDTO} from '../../data/Dtos';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

function Login({showToast}) {

  const {setAuth} = useAuth();
  const [btnStatus,SetButtonStatus] = useState(true);
  const [securityField,SetSecurityField] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname  || "/";

  const [loginData,SetLoginData]=useState(LoginDTO);




  const onSubmitHandler =((event)=>{

    event.preventDefault();


    axios.post("/api/auth/login",{usernameOrEmail:loginData.email,password:loginData.password},
      {
        headers:{"Content-Type":'application/json'},
        withCredentials:true
      }).then((response)=>{

          console.log(response);
          
          const accessToken = response?.data?.jwtAuthResponse;
          const id = response?.data?.id;
          const roles = response?.data?.roles;
          const name = response?.data?.name;
          const surname = response?.data?.surname;
          const username = response?.data?.username;
          const email = response?.data?.email;
          const password = response?.data?.password;


          
          // setAuth from response
          setAuth( {username, id ,password, email, name, surname, roles , accessToken} )
          localStorage.setItem('DTMeetToken', accessToken.accessToken);
          localStorage.setItem('DTMeetUserId', id);


          // SetSecurityField(true);
          // SetLoginData(LoginDTO);

          //GOOD
        showToast('success','Great','You are in DT Meet',2000);
        navigate(from, {replace: true });
        
        
        


      }).catch((err)=>{
        
        if(err?.response){
          showToast('error','Something went wrong', 'No server response',2500); 
        }
        else if (err.response?.status === 400 ){
          showToast('error','Something went wrong', 'Missing Username or Password',2500); 
        }
        else if (err.response?.status === 401 ){
          showToast('error','Something went wrong', 'Unauthorized',2500); 
        }
        else{
          showToast('error','Something went wrong', 'Login failed',2500); 
        }
        // BADDD

      });
  });
  const handleSignUp = () =>{navigate('/register');};

  useEffect(()=>{

    if (loginData.email.length>0 && handleEmail(loginData.email).length===0 && 
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
        setInput={SetLoginData} Data={loginData} handleFunction={handleEmail}/>

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