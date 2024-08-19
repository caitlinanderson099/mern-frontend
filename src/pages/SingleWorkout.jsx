import React from 'react'
import { ConeStriped } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const SingleWorkout = () => {
    const navigate = useNavigate();

  return (
    <>
        <button onClick={() => navigate(-1)} className='back-button'> Back </button>
        <div>
            <h1> Single Workout Page || Work In Progress <ConeStriped/> </h1>
        </div>
    </>
  )
}

export default SingleWorkout
