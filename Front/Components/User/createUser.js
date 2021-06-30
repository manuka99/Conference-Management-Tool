import React , {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    firstName:'',
    lastName:'',
    
    occupation:'',
    telephone:'',
    city:'',
    interests:[],
    options:[],
    selectedInterests:[]
}


class CreateUser extends Component {
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onInterestSelect = this.onInterestSelect.bind(this)
        this.state = initialState;
    }

    componentDidMount(){
        axios.get('http://localhost:5000/field/').then(response => {
            this.setState({interests:response.data.data}, () => {
                let data = [];
                    this.state.interests.map((item,index) => {
                        let interest = {
                            value:item._id,
                            label:item.name
                        }
                        data.push(interest)
                    });
                    this.setState({options:data});
            })
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onInterestSelect(e){
        this.setState({selectedInterests:e ? e.map(item => item.value) :[] });
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            occupation:this.state.occupation,
            telephone:this.state.telephone,
            city:this.state.city,
            interests:this.state.selectedInterests

        }
        axios.post('http://localhost:5000/user/create', user).then(response => {
            alert('Data inserted successfully')
        })
        .catch(error => {
            console.log(error.message)
            alert(error.message)
        })
    }


    render() {
        return(
            <div className = "container">
<br></br>
                <h2> Researcher Registration</h2><br></br>
                <form onSubmit = {this.onSubmit}>
  <div className="mb-3">
    <label htmlFor="firstName" className="form-label">First Name</label>
    <input type="text" 
    className="form-control" 
    id="firstName" 
    name = "firstName"
    value = {this.state.firstName}
    onChange ={this.onChange}
     />
   </div>
  
   <div className="mb-3">
    <label htmlFor="lastName" className="form-label">Last Name</label>
    <input type="text" 
    className="form-control" 
    id="lastName" 
    name = "lastName"
    value = {this.state.lastName}
    onChange ={this.onChange}
     />
   </div>
  

  <div className="mb-3">
    <label htmlFor="occupation" className="form-label">Occupation</label>
    <input type="text" 
    className="form-control" 
    id="occupation" 
    name = "occupation" 
    value ={this.state.occupation}
    onChange ={this.onChange}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="telephone" className="form-label">Telephone</label>
    <input type="text" 
    className="form-control" 
    id="telephone" 
    name = "telephone"
    value = {this.state.telephone}
    onChange ={this.onChange}
     />
   </div>

   <div className="mb-3">
    <label htmlFor="city" className="form-label">City</label>
    <input type="text" 
    className="form-control" 
    id="city" 
    name = "city"
    value = {this.state.city}
    onChange ={this.onChange}
     />
   </div>
Your Interests Fields
<Select
    options = {this.state.options}
    onChange = {this.onInterestSelect}
    className = "basic-multi-select"
    isMulti
/>
<br></br>
  <button type="submit" className="btn btn-primary"  style = {{justifyContent:'center'}}>Submit</button>
</form>

            </div>
        )
    }
}


export default CreateUser;