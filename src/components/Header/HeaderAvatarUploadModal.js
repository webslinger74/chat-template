import React, {useState, useEffect } from 'react';
import { Modal, Input, Button, Icon} from 'semantic-ui-react';
import mime from 'mime-types';


const HeaderAvatarUploadModal = ({modal, closeModal, upLoadFile}) => {

  const [file, setFile] = useState(null);
  const authorised = ['image/jpeg', 'image/png'];
  const [userName, setUserName] = useState("");

  const addFile = (event) => {
        const file = event.target.files[0];
        console.log(file, "the file being set")
        if(file) {
            setFile(file);
        }
  }

  const sendFile = () => {
      console.log(file, "the file");
      if(file !== null) {
          if(isAuthorised(file.name)) {
                const metaData = { contentType: mime.lookup(file.name)}
                console.log(userName, "the username")
                upLoadFile(file, metaData, userName);
                closeModal();
                setFile(null);
          }
      }
  }

  useEffect(()=> {

  }, [file])

  const isAuthorised = (fileName) => authorised.includes(mime.lookup(fileName));



    return (
     <Modal basic open={modal} onClose={closeModal}>
         <Modal.Content>
             <Input onChange={(e) => addFile(e)} fluid label="File Upload" name="file" type="file" />
             <Input style={{marginTop:'30px'}} id="userNameUpdate" type="text" label="Update display name" name="userName" value={userName} onChange={(event) => setUserName(event.target.value)} />
         </Modal.Content>
        <Modal.Actions>
            <Button onClick={sendFile} color="green" inverted>
                <Icon name="checkmark" />  Send
            </Button>
            <Button color="red" inverted onClick={closeModal}>
                <Icon name="remove" />  Cancel
            </Button>
        </Modal.Actions>
     </Modal>
   
    )
  
    }

export default HeaderAvatarUploadModal;
