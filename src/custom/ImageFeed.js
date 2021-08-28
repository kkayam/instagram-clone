import Post from './Post';
import React, { useState, useEffect } from 'react';


export default function ImageFeed(props){
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        var uid = props.firebase.auth().currentUser.uid;
        var posts_db = props.firebase.firestore().collection('posts');
        var users_db = props.firebase.firestore().collection('users');
        var userDocRef = props.firebase.firestore().collection('users').doc(uid);
        var storage = props.firebase.storage();

        userDocRef.get().then((doc) => {
            if (doc.exists) {
                var follows = doc.data().follows;
                posts_db.where("UID", "in", follows).orderBy("time", "desc")
                .limit(10).get()
                .then((posts) => {
                    var new_posts = [];
                    var img_promises = [];
                    var user_promises = [];

                    posts.docs.forEach((doc,index) => {
                        var imageURL = 'posts/'+doc.id+doc.data().type;
                        var pathReference = storage.ref(imageURL);
                        var user_promise = users_db.doc(doc.data().UID).get();
    
                        user_promises.push(user_promise);
                        var img_promise = pathReference.getDownloadURL()

                        img_promises.push(img_promise);
                    });
                    Promise.all(user_promises).then((responses) => {
                        responses.forEach((doc,index) => {
                            new_posts.push({
                                username:doc.data().username,
                                description:posts.docs[index].data().description
                            });
                        })
                    });

                    Promise.all(img_promises).then((responses) => {
                        responses.forEach((url,index) => {
                            new_posts[index]["img_src"] = url;
                        })
                        setPosts(new_posts);
                    });
                });

            }
        })
      }, []);

    return (
        <div class="imagefeed">
            {posts.map((post) => {
                return <Post post={post}/>
            })}
        </div>
    )
}