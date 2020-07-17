import React, { useState, useEffect } from 'react';
import axios from 'axios'
import RoomForm from './RoomForm';
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider';

function RoomsList() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    axios.get('/rooms')
      .then(res => {
        // res.data = [{id, name, messages:[]}]
        setRooms(res.data)
      }).catch(e => {
      })
  }, [])

  function handleRoomClicked(id) {
    console.log(id)
  }

  function renderRooms() {
    return rooms.map(room => (
      <div key={`room-${room.id}`}onClick={ () => handleRoomClicked(room.id) }>
        <h3>{room.name}</h3>
      </div>
    ))
  }

  function handleRoomReceieved(res) {
    setRooms([...rooms, res.room])
  }

  return (
    <div>
      <ActionCableConsumer
        channel={'RoomsChannel'}
        onReceived={handleRoomReceieved}
      />
      <RoomForm />
      <h1>Rooms List</h1>
      {renderRooms()}
    </div>
  );
}

export default RoomsList;
