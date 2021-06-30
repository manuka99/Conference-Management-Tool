import React , {Component} from 'react';
import other from '../Assets/Images/other.jpg';
import CreateField from '../InterestFields/createInterestFields';
import User from '../User/user';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

class Admin extends Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div >
                <Router>
                <div className="text-center">
  <img src={other} className="rounded" style = {{width: 200, height:200, marginTop:40,marginBottom:20,borderWidth:10,borderRadius:'10px'}}alt="..."/>
  <p className="h1">Paper Management</p>

                <div className="d-grid gap-2 col-6 mx-auto">
                < a href='/create-field' className="btn btn-secondary btn-lg" style={{marginTop:10}} role='button'> Create Interest Fields </a>
  <button className="btn btn-secondary btn-lg" style={{marginTop:10}}type="button">View Interests</button>
  < a href='/all-user' className="btn btn-secondary btn-lg" style={{marginTop:10}} role='button'> Registerd Researchers</a>
</div>
</div>
</Router>

<section>

<Switch>
                    
                    <Route path = "/create-field" component = {CreateField} exact/>
                    <Route path = "/all-user" component = {User} exact/>  
                   

                    </Switch>
</section>
            </div>
        )
    }
}

export default Admin;