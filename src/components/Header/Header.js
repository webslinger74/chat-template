import React, { useState } from 'react';
import '../../../src/App.css';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import HeaderLogout from './HeaderLogout';

const HeaderComponent = () => {
    return (
        <div>
            <Header className="headerComponent" style={{ maxWidth: 2000, margin:50, textAlign:"right"}}>
           <HeaderLogout />
            </Header>
        </div>
      );
}
 
export default HeaderComponent;