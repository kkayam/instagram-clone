import profile from "../resources/profile.PNG";
import {Link} from "react-router-dom";

export default function ContentSide(props){
    function signout(){
        props.firebase.auth().signOut().then(() => {})
      }

    return (
        <div className="contentside">
            <div className="contentside-inner">
                <div className="img-and-info">
                    <img width="90px" alt="" src={profile}/>
                    <div className="contentside-userinfo">
                        <Link className="username" to={"/"+props.user.username}><b>{props.user.username}</b></Link>
                        <span className="full-name">{props.user.name}</span>
                    </div>
                </div>
            <button className="signout" onClick={signout}>Sign out</button>
            </div>
        </div>
    )

}