import React, { useState } from 'react';
import '../../../src/App.css';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../../firebase';
import { useUserContext } from '../../context/userContext';

export const Login = () => {

  const { setGlobalUser } = useUserContext();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if(e.target.name === "email"){
          setEmail(e.target.value)
    }
    if(e.target.name === "password") {
         setPassword(e.target.value)
    }
}

const isFormValid = () => {
    if(isFormEmpty()) {
        setErrors(["Complete all the fields"])
        console.log(errors, "the errors array");
        return false;
    } else {
        return true;
    }
}

const isFormEmpty = () => {
    return email === '' || password === '';
}



const handleInputError = (errors, inputName) => {
   return errors.some(error => error.toLowerCase().includes(inputName)) ? 'error': ''
}


const handleSubmit = (e) => {
     e.preventDefault(); 
     if(isFormValid()) {
         setErrors([]);
         setLoading(true);
         firebase.auth()
         .signInWithEmailAndPassword(email, password)
         .then(signedInUser => {
           console.log(signedInUser, "the signed in user");
           setLoading(false);
           setGlobalUser(signedInUser);

           history.push('/');
         })
         .catch(err => {
           setErrors([err.message])
           setLoading(false);
         })
}
}
    return (

      <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450}}>
          <Header as="h2" icon color="orange" textAlign="center">
              <Icon name="puzzle piece" color="orange" />
              Login to Website
          </Header>
          <Form onSubmit={handleSubmit} size="large">
              <Segment>
         <Form.Input className={handleInputError(errors, "email")}
         fluid name="email" icon="mail" iconPosition="left"
              placeholder="Email Address" onChange={handleChange} type="text" value={email} />
         <Form.Input className={handleInputError(errors, "password")} fluid name="password" icon="lock" iconPosition="left" value={password}
              placeholder="Password" onChange={handleChange} type="text" />
              <Button disabled={loading} className={loading ? 'loading':'' }color="orange" fluid size="large">Login</Button>
              </Segment>
          </Form>
      {errors.size !==0 && errors.map((error, index) => (
          <Message key={index} className='error'>{error}</Message>
      ))}

         
          <Message><Link to="/register">No Account - click to register</Link></Message>
      </Grid.Column>

  </Grid>
);

}

export default Login;