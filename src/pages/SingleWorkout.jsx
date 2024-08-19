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
            <h2> Workout Title: "Placeholder"</h2>
            <h3> Reps: "Placeholder"</h3>
            <h3> Load: "Placeholder"</h3>
            <h3> Created At: "Placeholder"</h3>
            <h3> Edited At: "Placeholder"</h3>
            <h3> Created By: "Placeholder"</h3>
        </div>
    </>
  )
}

export default SingleWorkout
