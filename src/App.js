import React from 'react';
import './App.css';
import { useUserContext } from '../src/context/userContext';
import { useHistory } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import HeaderComponent from './components/Header/Header';

const App = () => {

  const { user } = useUserContext();
  let history = useHistory();

    return (
      <div className="App">
   
     {user !== undefined && user ? (
        <div>
        <HeaderComponent />
       <Grid columns-="equal" className="app" style={{ background: '#eee'}} >
         <Grid.Column style={{ marginLeft: 320}}>

         </Grid.Column>
         <Grid.Column style={{ marginLeft:820 }}>   
         more details can go here
         </Grid.Column>
     
       </Grid>
       </div>
     ) : history.push('/login')
      } 
      </div>
    );
  }

export default App;

