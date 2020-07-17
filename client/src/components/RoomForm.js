import React, { useState} from 'react'
import axios from 'axios'

export default function RoomForm(props) {
  const [name, setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
      await axios.post('/rooms', { name })
      setName('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Room Name:</label>
        <br />
        <input 
        value={name} 
        onChange={(e)=> setName(e.target.value)} />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}