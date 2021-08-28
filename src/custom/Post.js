// import sample from "../resources/sample_img.jpg"
import PostComments from "./PostComments"

export default function Post(props) {
    return (
        <div class="post">
            <div class="postheader">
                Some user, har inte pallat fixa än lol
            </div>
            <img alt={props.description} src={props.img_src}></img>
            
            <div class="comment">
                description not done yet
            </div>
            {/* <PostComments/> */}
        </div>
    )
}