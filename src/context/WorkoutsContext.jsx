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