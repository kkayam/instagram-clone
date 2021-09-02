import PostComments from "./PostComments";
import {Link} from "react-router-dom";

export default function Post(props) {
    function delete_post(){
        var promises = []
        var posts_db = props.firebase.firestore().collection('posts');
        promises.push(posts_db.doc(props.post.post_id).delete());
        var storage = props.firebase.storage();

        var imageURL = 'posts/'+props.post.post_id+props.post.img_type;
        var pathReference = storage.ref(imageURL);
        promises.push(pathReference.delete());

        Promise.all(promises).then(() => {
            console.log("rerendering");
            props.rerenderParent();
        })
    }

    return (
        <div className="post">
            <div className="postheader">
                <Link className="username" to={"/"+props.post.username}><b>{props.post.username}</b></Link>
                {(props.post.ownership) ? <button onClick={delete_post} className="delete-button">X</button>:""}
            </div>
            <img alt={props.post.description} src={props.post.img_src}></img>
            
            <div className="comment">
                {props.post.description}
            </div>
            <PostComments post={props.post} user={props.user} rerenderParent={props.rerenderParent} firebase={props.firebase}/>
        </div>
    )
}