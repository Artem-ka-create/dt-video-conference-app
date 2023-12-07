import React, { useState , useEffect} from 'react'
import AddRoom from './AddRoom';
import Room from './Room';
import styles from './RoomList.module.css';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from "react-router-dom";


import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import useRefreshToken from '../../hooks/useRefreshToken';

function RoomListComponent({showToastEvent}) {

  const [search,setSearch] = useState('');
  const [rooms,setRooms] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    let isMounted = true;
        const controller = new AbortController();

        const getRooms = async () => {
            try {

                const response = await axiosPrivate.get(`/api/v1/rooms/users/${localStorage.getItem('DTMeetUserId')}`, {
                    signal: controller.signal
                });
                console.log('RESPONSEEE-> ',response.data);
                isMounted && setRooms(response.data);
            } catch (err) {
                console.error(err);
                navigate('/signin', { state: { from: location }, replace: true });
            }
        }

        getRooms();

        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
  },[]);

  return (
    <>
    <h2>Your Rooms</h2>
    <div className={styles.roomSearchContainer}>
        <input placeholder='Find your room...' id='RoomSearch' value={search} onChange={(event)=>setSearch(event.target.value)} />
    </div>
    {/* <button onClick={useRefreshToken()}>REFREDSH</button> */}
    <div className={styles.roomListContainer}>

        {rooms.map((item,i) => <Room key={i} roomDetail={item} showToast={showToastEvent} roomsArr={rooms} roomInitialize={setRooms}  />) }
      <AddRoom showToast={showToastEvent} roomsArr={rooms} roomInitialize={setRooms}/>
    </div>


</>
    
  )
}

export default RoomListComponent;