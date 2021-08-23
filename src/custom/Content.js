import React from 'react';
import './Content.css'
import ImageFeed from "./ImageFeed.js"
import ContentSide from "./ContentSide"

class Content extends React.Component {
    render () {
        return (
            <div class="content">
                <ImageFeed/>
                <ContentSide/>
            </div>
        )
    }
}

export default Content;