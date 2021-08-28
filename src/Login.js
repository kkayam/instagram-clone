import './App.css';

import login_png from "./resources/login.PNG";
import "./Login.css"


function Login(props) {
  function LoginButton(){
    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;
    props.firebase.auth().setPersistence(props.firebase.auth.Auth.Persistence.LOCAL).then(
      ()=>
      {props.firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    })
    .catch((error) => {
    });}
    )
  }
  
  return (
    <div className="loginscreen">
        <img alt="" src={login_png}></img>
        <div className="loginandreg">
        <div className="logincontainer">
          <div className="logo">
            Buggygram
          </div>
          <div className="form">
            <input id="email-input" placeholder="Email"></input>
            <input type="password" id="password-input" placeholder="Password"></input>
            <button onClick={LoginButton}>Logga in</button>
          </div>
        </div>
        <div className="registercontainer">
            Har du inget konto?<a className="inline" href="/signup">Registrera dig</a>
        </div>
        </div>
    </div>
  );
}

export default Login;
