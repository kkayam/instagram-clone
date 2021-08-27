import './App.css';
import Navbar from './custom/Navbar';
import ProfileContent from './custom/ProfileContent';

export default function Profile(props) {
  return (
    <div className="App">
      <Navbar firebase={props.firebase}/>
      <ProfileContent/>
    </div>
  );
}