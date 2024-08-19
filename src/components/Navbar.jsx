import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();

  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0]: '';
  }

  // handleClick function for logout
  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
                <h1> Workout App </h1>
            </Link> 
            <nav>
             { user && <div>
                <span>{getEmailCharactersBeforeAtSymbol(user.email)}</span>
                <button onClick={handleClick}> Log Out </button>
              </div>}

              {!user && <div>
                <Link to='/login'> Log In </Link>
                <Link to='/signup'> Sign Up </Link>
              </div>}
            </nav>
        </div>
      
    </header>
  )
}

export default Navbar
