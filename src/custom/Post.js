// import sample from "../resources/sample_img.jpg"
import PostComments from "./PostComments"

export default function Post(props) {
    return (
        <div class="post">
            <div class="postheader">
                911.police
            </div>
            <img alt={props.description} src={props.img_src}></img>
            <PostComments/>
        </div>
    )
}