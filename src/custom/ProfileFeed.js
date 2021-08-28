import Post from './Post';
import React, { useState, useEffect } from 'react';
import './Content.css'


export default function ProfileFeed(props){
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        var posts_db = props.firebase.firestore().collection('posts');
        var users_db = props.firebase.firestore().collection('users');
        var storage = props.firebase.storage();

        if (props.profile.uid){
            posts_db.where("UID", "==", props.profile.uid).orderBy("time", "desc")
            .limit(10).get()
            .then((posts) => {
                var new_posts = [];
                var img_promises = [];
                var user_promises = [];

                posts.docs.forEach((doc,index) => {
                    var imageURL = 'posts/'+doc.id+doc.data().type;
                    var pathReference = storage.ref(imageURL);
                    var img_promise = pathReference.getDownloadURL();
                    var user_promise = users_db.doc(doc.data().UID).get();

                    user_promises.push(user_promise);
                    img_promises.push(img_promise);
                });

                
                Promise.all(user_promises).then((responses) => {
                    responses.forEach((doc,index) => {
                        new_posts.push({
                            username:doc.data().username,
                            description:posts.docs[index].data().description
                        });
                    })
                })

                Promise.all(img_promises).then((responses) => {
                    responses.forEach((url,index) => {
                        new_posts[index]["img_src"] = url;
                    })
                    setPosts(new_posts);
                })
            });   
        }
      }, [props.profile]);

    return (
        <div class="imagefeed">
            {posts.map((post) => {
                return <Post post={post}/>
            })}
        </div>
    )
}