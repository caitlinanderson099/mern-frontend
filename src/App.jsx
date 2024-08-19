import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import "./App.css"

// import pages
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import SingleWorkout from './pages/SingleWorkout'

const App = () => {
  // grab the user
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
      <Routes>
        {/* if we have a user, SHOW THE HOME PAGE, if else, GO TO LOG IN PAGE */}
        <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>

        {/* if we don't have a user, SHOW THE LOG IN PAGE, if we do, GO TO HOME PAGE */}
        <Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>

        {/* if we don't have a user, SHOW THE SIGN UP PAGE, if we do, GO TO HOME PAGE */}
        <Route path='/signup' element={!user ? <SignUp/> : <Navigate to='/'/>}/>

        {/* if we have a user, GO TO SINGLE WORKOUT PAGE, if else, GO TO LOG IN PAGE */}
        <Route path='/:id' element={user ? <SingleWorkout/> : <Navigate to='/login'/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
