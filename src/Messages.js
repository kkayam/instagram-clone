import './App.css';
import Navbar from './custom/Navbar';

function Messages(props) {
  return (
    <div className="App">
      <Navbar firebase={props.firebase}/>
    </div>
  );
}

export default Messages;
