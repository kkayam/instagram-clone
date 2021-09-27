import Post from './Post';
import React, { useState, useEffect } from 'react';
import './Content.css'


export default function ProfileFeed(props){
    const [posts, setPosts] = useState([]);
    const [ignore, setIgnore] = useState(0); // integer state

    function forceUpdate(){
        setIgnore(value => value + 1); // update the state to force render
    }

    useEffect(() => {
        var uid = props.firebase.auth().currentUser.uid;
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
                    new_posts.push({
                        post_id:doc.id,
                        img_type:doc.data().type
                    });
                    var imageURL = 'posts/'+doc.id+doc.data().type;
                    var pathReference = storage.ref(imageURL);
                    var img_promise = pathReference.getDownloadURL();
                    var user_promise = users_db.doc(doc.data().UID).get();

                    user_promises.push(user_promise);
                    img_promises.push(img_promise);
                });

                
                Promise.all(user_promises).then((responses) => {
                    responses.forEach((user_doc,index) => {
                        var post_data = posts.docs[index].data();
                        post_data["comments"] = posts.docs[index].data().comments.sort((a,b) => { return a.time-b.time});
                        new_posts[index] = {...user_doc.data(), ...post_data}


                        // new_posts[index]["username"] = doc.data().username;
                        // new_posts[index]["description"] = posts.docs[index].data().description;

                        if (user_doc.id === uid){
                            new_posts[index]["ownership"] = true;
                        } else {
                            new_posts[index]["ownership"] = false;
                        }
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
      }, [props.profile,props.firebase,ignore]);

    return (
        <div className="imagefeed">
            {posts.map((post,i) => {
                return <Post key={i} post={post} user={props.user} firebase={props.firebase} rerenderParent={forceUpdate}/>
            })}
        </div>
    )
}