import './App.css';
import Navbar from './custom/Navbar';
import ProfileContent from './custom/ProfileContent';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export default function Profile(props) {
    const [profile, setProfile] = useState([]);
    const location = useLocation();

    useEffect(() => {
        var users_db = props.firebase.firestore().collection('users');
        var username = location.pathname.substring(1).toLowerCase();
        users_db.where("username","==",username).get().then((profile) => {
            var profile_new = profile.docs[0].data();
            profile_new["uid"] = profile.docs[0].id;
            setProfile(profile_new);
        });
    },[location.pathname,props.firebase]);

    return (
        <div className="App">
        <Navbar firebase={props.firebase}/>
        <ProfileContent firebase={props.firebase} user={props.user} profile={profile}/>
        </div>
    );
}