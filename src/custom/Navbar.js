import './Navbar.css';
import profile from "../resources/profile.PNG";
import upload from "../resources/upload.png";

import {Link} from "react-router-dom";

import React, { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Navbar(props){
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    
  function signout(){
    props.firebase.auth().signOut().then(() => {})
  }

    function uploadImage(e){
        var file_input = window.document.getElementById("file-upload");
        var description_input = window.document.getElementById("modal-description-input");
        
        var posts_db = props.firebase.firestore().collection('posts');
        var type = "."+file_input.value.split('.')[1];
        
        var post = {
            UID:props.firebase.auth().currentUser.uid,
            description: description_input.value,
            type: type,
            time: Date.now(),
            comments:[]
        }

        posts_db.add(post).then((post) =>{
            var storageRef = props.firebase.storage().ref("posts/"+post.id+type);
            var file = file_input.files[0];
            storageRef.put(file).then(() => {
                closeModal();
                window.location.reload();
            });
        }
        )
    }

    function goToUserProfile(){
        var uid = props.firebase.auth().currentUser.uid;
        var userDocRef = props.firebase.firestore().collection('users').doc(uid);
        userDocRef.get().then((doc) => {
            var username = doc.data().username;
            window.location.href = username;
        });
    }

    function openModal(){
        setOpen(true)
    }

    function searchUser(e){
        if(e.key === 'Enter') {
            window.location = e.target.value;
        }
    }

    return (
    <div className="navbar">
        <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
            <input id="modal-description-input" onKeyDown={(e) => {if (e.key === 'Enter') {uploadImage()}}} placeholder="Description"></input>
            <br/>
    <div className="inner-popup">Upload image?
        <button onClick={uploadImage}>Yes</button>
        <button onClick={closeModal}>No</button>
    </div>
  </Popup>
        <span className="logo">
            <Link to="/">Buggygram</Link>
        </span>
        <input className="search" onKeyDown={searchUser} placeholder="Search"></input>
        <span className="buttons">
            <label className="file-upload">
                <input type="file" id="file-upload" accept="image/*" onChange={openModal} />
                <img alt="" src={upload} />
            </label>
            <button onClick={signout}>Sign out</button>
        <Link to="/"><svg aria-label="Startsida" className="_8-yf5 " fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path></svg></Link>
        <Link to="/messages"><svg aria-label="Direct" className="_8-yf5 " fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg></Link>
        <Link to="/explore"><svg aria-label="Hitta personer" className="_8-yf5 " fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path clipRule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fillRule="evenodd"></path></svg></Link>
        <svg aria-label="Aktivitetsflödet" className="_8-yf5 " fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            <img onClick={goToUserProfile} id="profile" alt="" src={profile}></img>
        </span>
    </div>);
}

export default Navbar;