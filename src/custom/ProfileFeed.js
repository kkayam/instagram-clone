import Post from './Post';
import React, { useState, useEffect } from 'react';
import './Content.css'


export default function ProfileFeed(props){
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        var posts_db = props.firebase.firestore().collection('posts');
        var storage = props.firebase.storage();

        console.log(props.profile.uid)
        if (props.profile.uid){
            posts_db.where("UID", "==", props.profile.uid).orderBy("time", "desc")
            .limit(10).get()
            .then((posts) => {
                var new_posts = []
                posts.docs.forEach((doc,index) => {
                    var imageURL = 'posts/'+doc.id+'.jpg';
                    var pathReference = storage.ref(imageURL);
                    pathReference.getDownloadURL().then((url) => {
                        new_posts.push({
                            img_src:url,
                            description:doc.data().description
                        })
                        if (index === posts.docs.length-1){
                            setPosts(new_posts);
                        }
                    })
                });
            });   
        }
      }, [props.profile]);

    return (
        <div class="imagefeed">
            {posts.map((post) => {
                console.log(posts)
                return <Post img_src={post.img_src} description={post.description}/>
            })}
        </div>
    )
}