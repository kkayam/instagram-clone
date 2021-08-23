import './Navbar.css';
import profile from "../resources/profile.PNG";
import explore from "../resources/explore.PNG";
import heart from "../resources/heart.PNG";
import messages from "../resources/messages.PNG";
import home from "../resources/home.PNG";

function Navbar(props){
    return (
    <div class="navbar">
        <span class="logo">
            Instagram
        </span>
        <input class="search" placeholder="Search"></input>
        <span class="buttons">
            <img alt="" src={home}></img>
            <img alt="" src={messages}></img>
            <img alt="" src={explore}></img>
            <img alt="" src={heart}></img>
            <img alt="" src={profile}></img>
        </span>
    </div>);
}

export default Navbar;