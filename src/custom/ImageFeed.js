import Post from './Post';
import React, { useState, useEffect } from 'react';


export default function ImageFeed(props){
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        var uid = props.firebase.auth().currentUser.uid;
        var posts_db = props.firebase.firestore().collection('posts');
        var userDocRef = props.firebase.firestore().collection('users').doc(uid);
        var storage = props.firebase.storage();

        userDocRef.get().then((doc) => {
            if (doc.exists) {
                var follows = doc.data().follows;
                posts_db.where("UID", "in", follows).orderBy("time", "desc")
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
        })
      }, []);

    return (
        <div class="imagefeed">
            {posts.map((post) => {
                return <Post img_src={post.img_src} description={post.description}/>
            })}
        </div>
    )
}