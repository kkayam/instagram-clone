// import sample from "../resources/sample_img.jpg"
// import PostComments from "./PostComments";
import {Link} from "react-router-dom";

export default function Post(props) {
    return (
        <div className="post">
            <div className="postheader">
                <Link to={"/"+props.post.username}>{props.post.username}</Link>
            </div>
            <img alt={props.post.description} src={props.post.img_src}></img>
            
            <div className="comment">
                description not done yet
            </div>
            {/* <PostComments/> */}
        </div>
    )
}