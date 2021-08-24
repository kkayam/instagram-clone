import './Navbar.css';
import profile from "../resources/profile.PNG";
import explore from "../resources/explore.PNG";
import heart from "../resources/heart.PNG";
import messages from "../resources/messages.PNG";
import home from "../resources/home.PNG";

import {Link} from "react-router-dom";

function Navbar(props){
    return (
    <div class="navbar">
        <span class="logo">
            Instagram
        </span>
        <input class="search" placeholder="Search"></input>
        <span class="buttons">
            <button onClick={props.signout}>Sign out</button>
        <Link to="/"><img alt="" src={home}></img></Link>
        <Link to="/messages"><img alt="" src={messages}></img></Link>
        <Link to="/explore"><img alt="" src={explore}></img></Link>
            <img alt="" src={heart}></img>
            <img alt="" src={profile}></img>
        </span>
    </div>);
}

export default Navbar;