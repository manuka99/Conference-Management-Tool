import React , {Component} from 'react';

import axios from 'axios';

class User extends Component {
    constructor (props) {
        super(props);
        this.state = {
            users: []
    };
    this.navigateInterestPage = this.navigateInterestPage.bind(this);

}

componentDidMount() {
    axios.get('http://localhost:5000/user').then (response => {
       this.setState({users:response.data.data})
    })
    }

    navigateInterestPage(e,userId) 
{
window.location=`/field/${userId}`;
}



 
      
            
            render() {
                return(
                    <div className = "container">
                            <h1> Registeterd Researchers</h1>
                            {this.state.users.length>0 && this.state.users.map((item,index) => (
                                <div key = {index} className = "card  mb-3">
                                    <div className="p-3" onClick = {e =>this.navigateInterestPage(e,item._id)}>
                                    <h5>First Name: {item.fistName}</h5>
                                    <h6>Last Name: {item.lastName}</h6>
                                    <h6>Occupation: {item.occupation}</h6>
                                    <h6>Telephone: {item.telephone}</h6>
                                    <h6>City: {item.city}</h6>
                                    </div>
                                    </div>
                            ))}
                    </div>
                )
            }
                                       
        }
            
    
    
    

export default User;