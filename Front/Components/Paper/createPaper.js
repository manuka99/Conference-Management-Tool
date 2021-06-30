import React , {Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import FileInput from './fileInput';

import axios from 'axios';


const initialState = {
    title:'',
    subject:'',
    type:'',
    author:'',
    pages: 0
    
}
class CreatePaper extends Component {
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
        let paper = {
            title:this.state.title,
            subject:this.state.subject,
            type:this.state.type,
            author:this.state.author,
            pages:this.state.pages
        }
        axios.post('http://localhost:5000/paper/create', paper).then(response => {
            alert('Data inserted successfully')
        })
        .catch(error => {
            console.log(error.message)
            alert(error.message)
        })
    }




    render() {
        return (
            <div>
                 <Router>
            <div className = "container">
<br></br>
            <h2>Add Paper</h2><br></br>
            <form onSubmit = {this.onSubmit}>
<div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input type="text" 
className="form-control" 
id="title" 
name = "title"
value = {this.state.title}
onChange ={this.onChange}
 />
</div>

<div className="mb-3">
<label htmlFor="subject" className="form-label">Subject</label>
<input type="text" 
className="form-control" 
id="subjectr" 
name = "subject"
value = {this.state.subject}
onChange ={this.onChange}
 />
</div>


<div className="mb-3">
<label htmlFor="type" className="form-label">Type</label>
<input type="text" 
className="form-control" 
id="type" 
name = "type" 
value ={this.state.type}
onChange ={this.onChange}
/>
</div>

<div className="mb-3">
<label htmlFor="author" className="form-label">Author</label>
<input type="text" 
className="form-control" 
id="author" 
name = "author"
value = {this.state.author}
onChange ={this.onChange}
 />
</div>

<div className="mb-3">
<label htmlFor="pages" className="form-label">No: of Pages</label>
<input type="Number" 
className="form-control" 
id="pages" 
name = "pages"
value = {this.state.pages}
onChange ={this.onChange}
 />
</div>
< a href="/paper-upload" className="btn btn-primary" style = {{marginRight:10}} role='button'> Upload the paper Here... </a>
<button type="submit" className="btn btn-primary" style = {{justifyContent:'center'}}>Submit</button>
</form>

        </div>
        </Router>

        <section>

                    <Switch>
                    
                    <Route path = "/paper-upload" component = {FileInput} exact/>
          
                    </Switch>
        </section>
        </div>
    )
}
}

export default CreatePaper;