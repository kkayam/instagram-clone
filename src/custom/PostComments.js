import {Link} from "react-router-dom";

export default function PostComments(props){
    function addComment(e){
        
        if(e.key === 'Enter') {
            var posts_db = props.firebase.firestore().collection('posts');
            var new_comments = props.post.comments;
            
            new_comments.push({
                text:e.target.value,
                time:Date.now(),
                uid:props.user.uid,
                username:props.user.username
            });

            posts_db.doc(props.post.post_id).update({
                comments:new_comments
            }).then(() => {
                e.target.value = ""
                props.rerenderParent()
            });
        }
    }

    return (
        <div className="comments">
            {(props.post.comments) ? props.post.comments.slice(0,5).map((comment)=>{
                return <div className="comment">
                    <b><Link className="username" to={comment.username}>{comment.username}</Link>{" "}</b>
                {comment.text}
                </div> 
            }):""}
            <input onKeyPress={addComment} className="comment-input" placeholder="Write a comment..."/>
        </div>
    )
}