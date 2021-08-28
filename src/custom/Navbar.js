import './Navbar.css';
import profile from "../resources/profile.PNG";
import explore from "../resources/explore.PNG";
import heart from "../resources/heart.PNG";
import messages from "../resources/messages.PNG";
import home from "../resources/home.PNG";

import {Link} from "react-router-dom";

function Navbar(props){
    
  function signout(){
    props.firebase.auth().signOut().then(() => {})
  }

    function uploadImage(e){
        var posts_db = props.firebase.firestore().collection('posts');
        var type = "."+e.target.value.split('.')[1];
        
        var post = {
            UID:props.firebase.auth().currentUser.uid,
            description: "absbsabs",
            type: type,
            time: Date.now()
        }

        posts_db.add(post).then((post) =>{
            var storageRef = props.firebase.storage().ref("posts/"+post.id+type);
            var file = e.target.files[0];
            storageRef.put(file);
        }
        );

    }

    function searchUser(e){
        if(e.key === 'Enter') {
            window.location = e.target.value;
        }
    }

    return (
    <div className="navbar">
        <span className="logo">
            <Link to="/">Buggygram</Link>
        </span>
        <input class="search" onKeyDown={searchUser} placeholder="Search"></input>
        <span class="buttons">
            <input type="file" accept="image/*" onChange={uploadImage}></input>
            <button onClick={signout}>Sign out</button>
        <Link to="/"><img alt="" src={home}></img></Link>
        <Link to="/messages"><img alt="" src={messages}></img></Link>
        <Link to="/explore"><img alt="" src={explore}></img></Link>
            <img alt="" src={heart}></img>
            <img alt="" src={profile}></img>
        </span>
    </div>);
}

export default Navbar;