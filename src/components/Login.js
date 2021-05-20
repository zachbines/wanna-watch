import '../styles/App.css';

const Login = ({handleLoginClick, handleNameChange}) => {
  
  return (
    // onClick = function which sets the state of Login to true. this renders the user-choice input on the screen and hides this form
    <form action="submit" className="user-login" onSubmit={handleLoginClick}>
      <label htmlFor="username" className="sr-only">What's your name?</label>
      {/* put onChange, and value in input
        onChange sets the userInput name, value={userName} */}
      <input type="text" id="username" placeholder="Type your name here" className="center" onChange={handleNameChange} autoComplete="off" required />
      <button className="button">Login</button>
    </form>
  )
}

export default Login;