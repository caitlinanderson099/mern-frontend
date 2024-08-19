import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
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

  // Bring In Dispatch Method
  const {dispatch} = useWorkoutsContext();

  // useNavigate initialization
  const navigate = useNavigate();

  // Set Up State Variables For The Edit Function 
  const [isEditing, setIsEditing] = useState(false);

  // Edit Form Inputs:
  const [editTitle, setEditTitle] = useState(workout.title);
  const [editLoad, setEditLoad] = useState(workout.load);
  const [editReps, setEditReps] = useState(workout.reps);

  // Comment States:
  const [commentText, setCommentText] = useState(''); // user input for the comment
  const [showComments, setShowComments] = useState(false); // hide/show of the comments
  // Bring In The User From The Local Storage
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user.email

  // Add Comment Function
  const handleAddComment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/comments/workouts/${workout._id}/comments`,
        {
          text: commentText, // This Is A State Variable
          user_id: user_id // This Is A State Variable
        }
      );

      if (response.status === 201) {
        // Update The Component State To Include The New Comment
        const newComment = response.data;
        const updatedComments = [...workout.comments, newComment]
        const updatedWorkout = {...workout, comments: updatedComments};

        // Dispatch The Updated Workout Data - Update The Context When A Comment Is Created
        dispatch({type: 'UPDATE_WORKOUT', payload: updatedWorkout});

        // Clear The Comment State:
        setCommentText('');
      }

    } catch (error) {
      console.error('Error Adding Comment: ', error);
      
    }
  }

  // Delete Workout Function
  const handleDelete = async () => {
    const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`);
  
    const json = await response.data
  
    if (response.status === 200 ) {
      console.log(json);
      dispatch({type: 'DELETE_WORKOUT', payload: json});
    }
  };

  // Edit Workout Function
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Submit/Save Edit Function
  const handleSubmitEdit = async () => {
    const updatedWorkout = {
      title: editTitle,
      load: editLoad,
      reps: editReps
    };

    try {
      const response = await axios.patch(
        `${baseURL}/api/workouts/${workout._id}`,
        updatedWorkout
      );
      const updatedData = response.data
      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({type: 'UPDATE_WORKOUT', payload: updatedData});
        setIsEditing(false);        
      }
    } catch (error) {
      console.error('Error Updating Workout', error);
    }
  };

  // Cancel Edit Function
  const handleCancelEdit = () => {
    setEditTitle(workout.title);
    setEditLoad(workout.load);
    setEditReps(workout.reps);
    setIsEditing(false);
  };

  // handleNavigate Function
  const handleNavigate = () => {
    let path = `/${workout._id}`
    navigate(path);
  }

  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }

  return (
    <div className='workout-details'>
      {isEditing ? (
        <div className='edit-modal'> 
          <label> Edit Exercise Title: </label>
          <input type='text' value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>

          <label> Edit Exercise Load: </label>
          <input type='Number' value={editLoad} onChange={(e) => setEditLoad(e.target.value)}/>

          <label> Edit Exercise Reps: </label>
          <input type='number' value={editReps} onChange={(e) => setEditReps(e.target.value)}/>

          <button id='cancel-btn' onClick={handleCancelEdit}> Cancel Changes </button>
          <button id='submit-btn' onClick={handleSubmitEdit}> Save Changes </button>
        </div>
      ) : (
        <>
        <div className='workout-content'>
          <div className='top-details'>
            <h4> {workout.title} </h4>
            <div className='icon-cont'>
              <span onClick={handleDelete}> <TrashFill className='icons'/> </span>
              <span onClick={handleEdit}> <PencilSquare className='icons'/> </span>
            </div>
          </div> 
          {workout.image && (
            <img className='workout-image' src={`${baseURL}/public/uploads/${workout.image}`} alt={workout.title}/>
          )}
          <p> <strong> Load (kg): </strong> {workout.load} </p>
          <p> <strong> Reps (kg): </strong> {workout.reps} </p>
          <p> {formatDistanceToNow(new Date(workout.createdAt), {includeSeconds: true}, {addSuffix: true})} </p>
          <p> <strong> Created By: </strong> {workout.user_id ? getEmailCharactersBeforeAtSymbol(workout.user_id) : 'Unknown'} </p>
          <button className='read-more-btn' onClick={handleNavigate}> Read More </button>
        </div>
        </>
      )}
      <button className='show-comments-btn'
        onClick={() => {
          setShowComments(!showComments)
          console.log(workout.comments[0]);
        }}
      >
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && (
        <>
          <div className='comments'>
            {/* Map Over The Comments Array */}
            {workout.comments.map((comment) => (
              <div key={comment._id} className='comment'>
                <h5> {getEmailCharactersBeforeAtSymbol(comment.user_id)} </h5>
                <p> {comment.text} </p>
                <span> 
                  <strong> Posted: </strong> {formatDistanceToNow(new Date(comment.createdAt), {includeSeconds: true})}{' '}ago 
                </span>
              </div>
            ))}
          </div>

          {/* Add Comment Section: */}
          <div className='add-comment'>
            <label> Add New Comment </label>
            <input
              type='text' placeholder='Add A Comment...'
              value={commentText} onChange={(e) => setCommentText(e.target.value)}
            />
            <button className='post-btn' onClick={handleAddComment}> Post </button>
          </div>
        </>
      )}

    </div>
  )
}

export default WorkoutDetails
