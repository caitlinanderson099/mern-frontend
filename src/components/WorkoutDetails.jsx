import React from 'react'
import axios from 'axios'

// import custom context hook
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import date formatting
import {formatDistanceToNow} from 'date-fns'

// importing icons
import {TrashFill} from 'react-bootstrap-icons'
import { PencilSquare } from 'react-bootstrap-icons';

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutDetails = ({workout}) => {

 // bring in dispatch method
 const {dispatch} = useWorkoutsContext()

  const handleDelete = async () => {
    const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`);
  
    const json = await response.data
  
    if (response.status === 200 ) {
      console.log(json)
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const handleEdit = async () => {
  }

  return (
    <div className='workout-details'>
      <div className='workout-content'> 
        <h4> {workout.title} </h4>
        <p> <strong> Load (kg): </strong> {workout.load} </p>
        <p> <strong> Reps (kg): </strong> {workout.reps} </p>
        <p> {formatDistanceToNow(new Date(workout.createdAt), {includeSeconds: true}, {addSuffix: true})} </p>
      </div>
        <div id='handle-buttons'> 
          <span onClick={handleDelete}> <TrashFill className='trash-icon'/> </span>
          <span onClick={handleEdit}> <PencilSquare className='edit-icon'/> </span> 
        </div>
    </div>
  )
}

export default WorkoutDetails
