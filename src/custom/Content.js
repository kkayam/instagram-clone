import React from 'react';
import './Content.css'
import ImageFeed from "./ImageFeed.js"
import ContentSide from "./ContentSide"

function Content(props) {
    return (
        <div className="content">
            <ImageFeed user={props.user} firebase={props.firebase}/>
            <ContentSide user={props.user}/>
        </div>
    )
}

export default Content;