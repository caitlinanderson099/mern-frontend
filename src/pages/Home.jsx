import { useState, useEffect } from "react"
import axios from 'axios'

// importing the workoutdetails component
import WorkoutDetails from "../components/WorkoutDetails";
// importing the workoutform component
import WorkoutForm from "../components/WorkoutForm";


const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
           const response = await axios.get('http://localhost:4000/api/workouts/');
           //console.log(response.data);
           if(response.status === 200) {
            setWorkouts(response.data)
           }
            
        }
        fetchWorkouts(); // this is calling out the function afterwards but inside of the useeffect still
    }, []);

  return (
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) => {
                return (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                )
            })}

        </div>

        <WorkoutForm/>
    </div>
  )
}

export default Home
