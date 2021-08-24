import './App.css';
import Navbar from './custom/Navbar';
import Content from './custom/Content';

function Home(props) {

  function signout(){
    props.firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="App">
      <Navbar signout={signout}/>
      <Content/>
    </div>
  );
}

export default Home;
