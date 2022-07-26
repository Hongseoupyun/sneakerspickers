import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Register.scss"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register() {

  const [email, setEmail] = useState('');;
  const [password, setPassword] = useState('');
  const [user_name, setName] = useState('');

  const navigate = useNavigate();
  
  function registerUser(e) {
    e.preventDefault()
    console.log("submit fire")
    return(axios.post('/register', {email:email, password:password, user_name:user_name})
    .then((result) => {
      console.log("Successful registration", result)
    })
    .then(() => {
      navigate('/login')
    })
    )
  }


  return (
    <div className="signup-body">
      <section className="signup-form">
      <h1 className="signup-heading">Sign Up</h1>
      <form method="POST" onSubmit={registerUser} id="signup">
        <div className="int-area">
          <input type="text" name="name" onChange={event => setName(event.target.value)}autoComplete="off" required />
          <label>Your Name</label>
        </div>
        <div className="int-area">
          <input input type="text" name="email" onChange={event => setEmail(event.target.value)}autoComplete="off" required />
          <label>Your Email</label>
        </div>
        <div className="int-area">
          <input
            input type="password" name="password" onChange={event => setPassword(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>
        <div className="int-area">
          <input
            type="password"
            name="new-password"
            autoComplete="off"
            required
          />
          <label>Confirm Password </label>
        </div>
        <div className="btn-area">
          <button type="submit" >Save Changes</button>
        </div>
        <div className="caption">
            Have an account? Sign in <a href="/login">here</a>
          </div>
      </form>
    </section>
    </div>
  )
}

export default Register;