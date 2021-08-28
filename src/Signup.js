import './App.css';

import "./Login.css"


function Signup(props) {
  function createButton(){
    let email = document.getElementById('email-input').value;
    let name = document.getElementById('name-input').value;
    let username = document.getElementById('username-input').value.toLowerCase();
    let password = document.getElementById('password-input').value;
    let user_db = props.firebase.firestore().collection('users');


    props.firebase.auth().setPersistence(props.firebase.auth.Auth.Persistence.LOCAL).then(()=>
      {props.firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      user_db.doc(userCredential.user.uid).set({
        followers:[],
        follows:[userCredential.user.uid],
        name:name,
        username:username
      }).then(() => {
        window.location.href = "/";
      })
    });}
    )
  }
  
  return (
    <div className="loginscreen">
      <div class="loginandreg">
        <div class="logincontainer">
          <div class="logo">
            Koraystagram
          </div>
          <div class="form">
            <input id="email-input" placeholder="Email"></input>
            <input id="name-input" placeholder="Name"></input>
            <input id="username-input" placeholder="Username"></input>
            <input type="password" id="password-input" placeholder="Password"></input>
            <button onClick={createButton}>Gå med</button>
          </div>
        </div>
        <div class="registercontainer">
            Har du ett konto?<a class="inline" href="/">Logga in</a>
        </div>
        </div>
    </div>
  );
}

export default Signup;
