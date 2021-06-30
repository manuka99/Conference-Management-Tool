import React , {Component} from 'react';
import axios from 'axios';

const initialState = {
    fieldName:'',
    description:'',
    
}

class CreateInterest extends Component {
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = initialState;

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let interest = {
            name:this.state.fieldName,
            description:this.state.description,
            
        }
        axios.post('http://localhost:5000/field/create', interest).then(response => {
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
                <h2>Create Interest Field </h2><br></br>
                <form onSubmit = {this.onSubmit}>
  <div className="mb-3">
    <label htmlFor="fieldName" className="form-label">Interest Field Name</label>
    <input type="text" 
    className="form-control" 
    id="fieldName" 
    name = "fieldName"
    value = {this.state.fieldName}
    onChange ={this.onChange}
     />
   </div>
  
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control"
   id="description" 
   rows="3" 
   name = "description"
    value = {this.state.description}
        onChange ={this.onChange} > 
        </textarea>   

  </div>

  
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

            </div>
        )
    }
}


export default CreateInterest;