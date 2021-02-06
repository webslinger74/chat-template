import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Menu, Form, Segment, Button, Header, Dropdown, Message, Image, Icon} from 'semantic-ui-react';
import { useUserContext } from '../../context/userContext';
import firebase from '../../firebase';
import HeaderAvatarUploadModal from './HeaderAvatarUploadModal';
const { uuid } = require('uuidv4');

const HeaderLogout = () => {

    let history = useHistory();
    const { user, clearGlobalUser, setGlobalUser } = useUserContext();
    const [modal, setModal] = useState(false);
    const [storageRef, setStorageRef] = useState(firebase.storage().ref());
    const [userRef, setUserRef] = useState(firebase.database().ref('users'));
    const [upLoadTask, setUpLoadTask] = useState(null);
    const [upLoadState, setUpLoadState] = useState('done');
    
    const changeAvatarImage = () => {
        setModal(true);
        console.log(user.user.photoURL);
    }

    const closeModal = () => {
        setModal(false);
    }

    const signOutUser = () => {
        firebase.auth()
        .signOut()
        .then(() => {
               clearGlobalUser();
               history.push('/login');
        })
        .catch((err)=> {
            console.log(err);
        }) 
    }

    const dropDownOptions = () => [
        {
            key: "user",
            text:<span>Signed in as <strong>{user.user.displayName}</strong></span>,
            disabled:true
        },
        {
            key: "avatar",
            text:<span onClick={changeAvatarImage}>Change Avatar</span>
        },
        {
            key:"signout",
            text:<span onClick={signOutUser}>Sign Out</span>
        }
    ]

    const upLoadFile = (file, metaData, name) => {
        const filePath = `website/public/${uuid()}.jpg`;
        storageRef.child(filePath).put(file, metaData)
        .then(snapshot => {
            console.log(snapshot, "the snapshot baby");
            snapshot.ref.getDownloadURL().then(downloadUrl => {
                console.log(downloadUrl, "the downloadurl");

            const userId = user.user.uid;
            firebase.auth().currentUser.updateProfile({
                displayName:name === "" ? user.user.displayName : name,
                photoURL:downloadUrl
            }).then(() => {
            
            })
            console.log(userId, "USERID");
            userRef.child(`${userId}/avatar`).set(downloadUrl);
            
            })
        }).catch(err => {
            console.log(err)
        })
      }


      useEffect(() => {
        userRef.child(`${user.user.uid}/avatar`).on('child_changed', () => {
            console.log("this was blinking called")
        })
      },[])

   


    return (
     <Grid style={{background: '#4c3c4c'}}>
     <Grid.Column>
         <Grid.Row style={{ padding:'1.3em', margin:0}}>
             <Header inverted floated="left" as="h2">
                 <Header.Content>
                     <Icon name="code" />
                     WebSite
                 </Header.Content>
             </Header>
         </Grid.Row>
         <Header style={{padding:'0.25em'}} as="h4" inverted>
             <Dropdown trigger={<span>
                 <Image src={user.user.photoURL} spaced="right" avatar />
                 {user.user.displayName}</span>}  options={dropDownOptions()}/>
         </Header>
     </Grid.Column>
     <HeaderAvatarUploadModal modal={modal} closeModal={closeModal} upLoadFile={upLoadFile} />
     </Grid>
    )
  
    }

export default HeaderLogout;
