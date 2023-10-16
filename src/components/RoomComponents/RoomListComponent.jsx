import React, { useState } from 'react'
import AddRoom from './AddRoom';
import Room from './Room';
import styles from './RoomList.module.css';
function RoomListComponent() {

    const [search,setSearch] = useState('');




  return (
    <>
    <h2>Your Rooms</h2>
    <div className={styles.roomSearchContainer}>
        <label htmlFor='RoomSearch'>Search</label>
        <input placeholder='Find your room...' id='RoomSearch' value={search} onChange={(event)=>setSearch(event.target.value)} />
    </div>
    <div className={styles.roomListContainer}>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
      <Room/>
      <AddRoom/>
    </div>


</>
    
  )
}

export default RoomListComponent;