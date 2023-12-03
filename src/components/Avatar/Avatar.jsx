import React, {useState} from 'react'
import style from './Avatar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-regular-svg-icons'
import {emojiARR} from "../../data/emojiArr";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import { Button } from 'primereact/button';

import {Dialog} from 'primereact/dialog';
import useAuth from '../../hooks/useAuth'
import {useNavigate} from "react-router-dom";


function Avatar({showToast}) {

  const [showDetail,setshowDetail] = useState(false);
  const { auth } = useAuth();
    const {setAuth} = useAuth();
  const [icon, setIcon] = useState(emojiARR[0].emoji);
    const navigate = useNavigate();

    function getRandomNumber() {
        const randomDecimal = Math.random();
        return Math.floor(randomDecimal * 5) + 1;
    }

    const handleAvatarIconClick =()=>{
        setshowDetail(!showDetail);
        let randomNumber = getRandomNumber();

        let emojiIcon = emojiARR.find((item)=> item.id===randomNumber).emoji;
        setIcon(emojiIcon);
    }
    const handleLogoutCLick = () => {

        setshowDetail(false)
        showToast('success','Great','Successfully Signed-out',2000);
        setAuth({});
        localStorage.removeItem('DTMeetUserId');
        localStorage.removeItem('DTMeetToken');
        navigate('/signin');

    }
    const handleManageProfileClick = () => {
        setshowDetail(false)
        console.log('MANAGE PROFILE')
    }

  return (
    <>
      <button className={style.avatarbtn} onClick={()=> handleAvatarIconClick()}>
      <FontAwesomeIcon icon={faUser} />
      </button>

      <Dialog position='top-right' draggable={false} visible={showDetail} style={{ width: '30vw' , height:' 50.6vh'}}  onHide={() => setshowDetail(false)}>
          <div className={style.avatarContainer}>
              <div className={style.emojiIcon} >
                  <FontAwesomeIcon icon={icon} />
              </div>
              <div className={style.textContainer}>
                  <div>Hi, {auth.name}</div>
                  <div className={style.emailText}>{auth.email}</div>
              </div>

              <div className={style.btnContainer} >

                  <Button  label='Manage profile' severity="info" style={{fontSize:'20px',height:"55px", background:'#E10075', border:'none'}} raised onClick={() =>handleManageProfileClick() }  />
                  <Button  label ="Sign-out" icon="pi pi-sign-out" style={{fontSize:'20px',height:"55px"}}  className="p-button-danger" raised onClick={() => handleLogoutCLick()}  />
              </div>

          </div>
        </Dialog>
    </>
  )
}

export default Avatar