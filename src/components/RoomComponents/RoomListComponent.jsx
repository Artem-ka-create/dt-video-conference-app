import React, {useState, useEffect, useReducer} from 'react'
import AddRoom from './AddRoom';
import Room from './Room';
import styles from './RoomList.module.css';
import {useNavigate, useLocation} from "react-router-dom";


import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {ProgressSpinner} from "primereact/progressspinner";

function RoomListComponent({showToastEvent}) {

    const [search, setSearch] = useState('');
    const [rooms, setRooms] = useState([]);
    const [roomSave, setRoomSave] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [load,setLoad] = useState(false);


    useEffect(() => {


    }, [search])

    const searchHandler = (text) => {
        setLoad(true)
        console.log("SEARCH=> ", text)

        if (text === '') {
            setRooms(roomSave)
        } else {
            // const filterBySearch =
            let arr = roomSave.filter((room) => room.name.toLowerCase().includes(text.toLowerCase()))
            console.log("flter=>", arr)
            setRooms(arr)
        }
        setSearch(text)
    }


    useEffect(() => {
        console.log("roms-", rooms)
            // forceUpdate()
        setTimeout(()=> {
            setLoad(false)
        }, 500)

    }, [rooms]);


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getRooms = async () => {
            try {

                const response = await axiosPrivate.get(`/api/v1/rooms/users/${localStorage.getItem('DTMeetUserId')}`, {
                    signal: controller.signal
                });
                console.log('RESPONSEEE-> ', response.data);
                if (isMounted) {
                    setRooms(response.data)
                    setRoomSave(response.data)
                }
            } catch (err) {
                console.error(err);
                navigate('/signin', {state: {from: location}, replace: true});
            }
        }

        getRooms();

        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <h2>Your Rooms</h2>
            <div className={styles.roomSearchContainer}>
                <input placeholder='Find your room...' id='RoomSearch' value={search}
                       onChange={(event) => searchHandler(event.target.value)}/>
            </div>
            {/* <button onClick={useRefreshToken()}>REFREDSH</button> */}
            <div className={styles.roomListContainer}>

                {load ?  <ProgressSpinner style={{width: '4.4rem', height: '4.4rem'}} strokeWidth="5" animationDuration=".8s"/> :
                <>
                    {rooms.map((item, i) =><Room key={i} roomDetail={item} showToast={showToastEvent} roomsArr={rooms}
                                                 roomInitialize={setRooms}/>)}
                    <AddRoom showToast={showToastEvent} roomsArr={rooms} roomInitialize={setRooms}/>
                </>
                }


            </div>


        </>

    )
}

export default RoomListComponent;