import React from 'react'
import "../components/css/GroupsTravel.css"

const GroupsTravel = () => {
  const hotels = ['Le meurice', 'Park Hyatt', 'Courtyard by mariott']
  const users = ['abc', 'pqr', 'xyz', '123', 'asda']
  return (
    <div className='groups-travel'>
      <form>

        <input type="text" placeholder='Location' required />

        <select>
          <option disabled selected>Hotels</option>
          {hotels.map((value, index) => {
            return (
              <option value={value}>{value}</option>
            )
          })}
        </select>
        <div className='groups-travel1'>
          {
            users.map((value, index) => {
              return (
                <>
                  <input type='checkbox' value={value} /><label htmlFor="">{value}</label>
                </>
              )
            })
          }
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default GroupsTravel
