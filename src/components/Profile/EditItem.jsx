import Input from "../UI/Input/Input";
import styles from "./EditItem.module.css"
import roomStyle from "../RoomComponents/Room.module.css"
import React, {useEffect, useState} from "react";
import SubmitButton from "../UI/Button/SubmitButton";
import {Button} from "primereact/button";
import {handleEmail, handleSimpleField} from "../../libs/handleLib";
import {useLocation, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function EditItem({showToast}) {

    const params = new URLSearchParams(new URL(window.location.href).search);
    let editItemName = params.get('item');
    const formData = useLocation().state;
    const {auth,setAuth} = useAuth();



    const [data, setData] = useState({item: formData.item});
    const [btnStatus, SetButtonStatus] = useState(false);

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();


    function capitalizeFirstLetter(str) {
        if (str && str.length > 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str;
        }
    }

    useEffect(() => {

        if (editItemName !== 'email') {
            if (data.item.length > 0 && handleSimpleField(data.item).length === 0) {

                SetButtonStatus(false);
            } else {
                SetButtonStatus(true);
            }
        }else{
            if (data.item.length > 0 && handleEmail(data.item).length === 0) {

                SetButtonStatus(false);
            } else {
                SetButtonStatus(true);
            }
        }

    }, [data, editItemName]);
    const OnUpdateUser = (event) => {
        event.preventDefault();


        axiosPrivate.put(`/api/v1/users/${auth.id}`, {
            [editItemName] : data.item
        },{
            headers:{"Content-Type":'application/json'},
            withCredentials:true
        }).then((response)=>{

            console.log(response);

            const accessToken = response?.data?.jwtAuthResponse;
            const id = response?.data?.id;
            const roles = response?.data?.roles;
            const name = response?.data?.name;
            const surname = response?.data?.surname;
            const username = response?.data?.participant.username;
            const email = response?.data?.email;
            const password = response?.data?.password;

            setAuth( {username, id ,password, email, name, surname, roles , accessToken} )

            showToast('success','Great','User was successfully updated',2000);


        }).catch((err)=> {

            console.log(err);
            showToast('error','Oh','User was not updated, something is wrong',2000);
        })

        console.log('updateUser');
    }
    const OnHandleBack = () => {
        navigate('/profile');
    }

    return (
        <div className={styles.editContainer}>

            <h1>Edit {capitalizeFirstLetter(editItemName)} </h1>

            <form onSubmit={OnUpdateUser}>

                { editItemName!=='email'?

                    <Input
                        labelText={capitalizeFirstLetter(editItemName)}
                        entity='item' value={data.item}
                        setInput={setData} Data={data} handleFunction={handleSimpleField}/>
                :
                    <Input
                        labelText={capitalizeFirstLetter(editItemName)}
                        entity='item' value={data.item}
                        setInput={setData} Data={data} handleFunction={handleEmail}/>}



                <div className={styles.btnContainer}>
                    <Button label="Back" type={'button'} className={roomStyle.dialogCloseBtnPrm}
                            style={{padding: '13px 17px'}} onClick={() => OnHandleBack()}/>
                    <SubmitButton btnDisabled={btnStatus} btnText={"Save"}/>
                </div>
            </form>

        </div>
    )
}

export default EditItem;