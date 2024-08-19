// this is all the set up for a context below
import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': 
            return {
                workouts: action.payload // what this does is update all of the workouts to new workouts
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts] 
                // (action.payload would be the newly created workout)
                // '...' is a spread operator that is taking the workouts and spread them open to see each of the items in the data
            } 
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT': {
            const updatedWorkout = action.payload;
            const updatedWorkouts = state.workouts.map(workout => {
                if (workout._id === updatedWorkout._id) {
                    // swap the workout for the new one if the id's match
                    return updatedWorkout
                }
                // return each workout
                return workout
            });

            return {
                workouts: updatedWorkouts
            }

        }
        default: 
            return state       
    }
}

export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}
// this is all the set up for a context above