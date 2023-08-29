import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

import SubmitButton from './UI/Button/SubmitButton'
import Input from './UI/Input/Input'
import styles from './JoinForm.module.css'

function JoinForm() {
    const location = useLocation();

    const [data,setData] = useState({url:''});

    const onSubmitHandler =(event)=>{
        event.preventDefault();
        // location.push({url:'de'})
        console.log(location);
        // createUrl(data.url);
        setData({url:''});
    };

  return (
    <>
    <h2>JoinForm</h2>
    
    <form  onSubmit={onSubmitHandler} className={styles.form_container}>
        <Input labelText={"Input Url"} entity='url' value={data.url} setInput={setData} Data={data} />
        <SubmitButton/>
    </form>
    </>
  )
}

export default JoinForm