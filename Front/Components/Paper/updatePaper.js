import React , {Component} from 'react';

import axios from 'axios';



class UpdatePaper extends Component {
    constructor (props) {
        super(props);
        this.state = { papers: [] };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
           
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/paper/${this.props.match.params.id}`)
        .then(response => {
          this.setState({ papers: response.data.papers })
        console.log(response.data.data)
          
        })
        .catch(error => {
          alert(error.message)
        })
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
        axios.patch('http://localhost:5000/paper/update/:id', paper).then(response => {
            alert('Data inserted successfully')
        })
        .catch(error => {
            console.log(error.message)
            alert(error.message)
        })
    }
    
  


    render() {
        return (
           <div className = "container">
<br></br>
            <h2>Update Paper</h2><br></br>
            
             
            <form    onSubmit = {this.onSubmit}>
           
<div className="mb-3">
<label htmlFor="title" className="form-label">Title  </label>
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

<button type="button" className="btn btn-primary" style = {{marginRight:10}}> Upload the paper</button>
<button type="submit" className="btn btn-primary">Submit</button>

</form>


</div>


/*<div className = "container">
                    <br></br>
                        <h4>My Papers</h4>
                        {this.state.papers.length>0 && this.state.papers.map((item,index) => (
                            
                            <div key = {index} className = "card border-info mb-3" >
                                
                                <div className ="p-3">
                                <h5>Subject: {item.title}</h5>
                                <h6>Title: {item.subject}</h6>
                                <h6>Type: {item.type}</h6>
                                <h6>Author: {item.author}</h6>
                                <h6>Pages: {item.pages}</h6>
                                <h6>Date: {item.date}</h6>
                                
                                <button type="button" className="btn btn-primary" style = {{marginRight:10}} onClick = {e =>this.navigateSubjectPage(e,item._id) }>Update</button>
                                <button type="button" className="btn btn-secondary">Delete</button>
                                </div>
                                </div>
                                

                                
                        ))}
                </div>*/

     
    )
}
}

export default UpdatePaper;