import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import NavBar from './Components/Header/NavBar';
import CreatePaper from './Components/Paper/createPaper';
import AllPapers from './Components/Paper/allPapers';
import UpdatePaper from './Components/Paper/updatePaper';
import CreateUser from './Components/User/createUser';
import User from './Components/User/user';
import CreateField from './Components/InterestFields/createInterestFields';
import Interests from './Components/InterestFields/interests';
import Admin from './Components/Header/Admin';
import Home from './Components/Header/home';

import FileInput from './Components/Paper/fileInput';

const App = () => {
    return(
        <div>
            <Router>
                <NavBar/>
               
                <section>
                    <Switch>
                    <Route path = "/home" component = {Home} exact/>  
                    <Route path = "/field/:id" component = {Interests} exact/>    
                    <Route path = "/admin" component = {Admin} exact/>  
                    <Route path = "/all-user" component = {User} exact/>  
                    <Route path = "/create-field" component = {CreateField} exact/>
                    <Route path = "/create-user" component = {CreateUser} exact/>
                    <Route path = "/create-paper" component = {CreatePaper} exact/>
                    <Route path = "/all-paper" component = {AllPapers} exact/>
                    <Route path = "/:id" component = {UpdatePaper} exact/> 
                    <Route path = "/paper-upload" component = {FileInput} exact/>
                    </Switch>
                </section>

            </Router>
        </div>
    )
}

export default App;