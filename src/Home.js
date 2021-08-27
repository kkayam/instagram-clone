import './App.css';
import Navbar from './custom/Navbar';
import Content from './custom/Content';

function Home(props) {
  return (
    <div className="App">
      <Navbar firebase={props.firebase}/>
      <Content firebase={props.firebase}/>
    </div>
  );
}

export default Home;
