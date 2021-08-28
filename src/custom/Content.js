import React from 'react';
import './Content.css'
import ImageFeed from "./ImageFeed.js"
import ContentSide from "./ContentSide"

function Content(props) {
    return (
        <div className="content">
            <ImageFeed firebase={props.firebase}/>
            <ContentSide/>
        </div>
    )
}

export default Content;