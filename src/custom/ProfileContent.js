import "./ProfileContent.css";
import ProfileFeed from './ProfileFeed';

export default function ProfileContent(props) {
    function follow(){
        var uid = props.firebase.auth().currentUser.uid;
        var userDocRef = props.firebase.firestore().collection('users').doc(uid);
        userDocRef.get().then((doc) => {
            var data = doc.data();
            var follows = data.follows;
            if (!follows.includes(props.profile.uid)){
                follows.push(props.profile.uid);
                data.follows = follows;
                userDocRef.set(data).then();
            }
        })

    }
    return (
        <div className="profilecontent">
            <h2 className="profilename">
                {props.profile.name}
            </h2>
            <button onClick={follow}>Follow</button>
            <br></br>
            <ProfileFeed user={props.user} firebase={props.firebase} profile={props.profile}/>
        </div>
    )
}