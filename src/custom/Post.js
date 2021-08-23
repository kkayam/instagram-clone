import sample from "../resources/sample_img.jpg"
import PostComments from "./PostComments"

export default function Post(props) {
    return (
        <div class="post">
            <div class="postheader">
                911.police
            </div>
            <img alt="" src={sample}></img>
            <PostComments/>
        </div>
    )
}