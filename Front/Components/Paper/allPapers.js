import React , {Component} from 'react';
import axios from 'axios';

class AllPapers extends Component {
    constructor (props) {
        super(props);
        this.state = {
            papers: []
    };
    this.navigateSubjectPage = this.navigateSubjectPage.bind(this);
    this.deletePaper=this.deletePaper.bind(this)
}

componentDidMount() {
    axios.get('http://localhost:5000/paper/all').then (response => {
       this.setState({papers:response.data.data})
    })
    }

    navigateSubjectPage(e,paperId) 
{
window.location=`/${paperId}`;
}

deletePaper(id) {
    axios
      .delete("http://localhost:5000/paper/delete" + id)
      .then((res) => console.log(res.data));

    this.setState({
      papers: this.state.papers.filter((el) => el._id !== id),
    });

    
  }

    render() {
        return (
            
                <div className = "container">
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
                                <button type="button" className="btn btn-secondary" onClick={()=>{props.deletePaper(props.papers._id)}} >Delete</button>
                                
                                </div>
                                </div>
                                

                                
                        ))}
                </div>
            )
        }
    }
    

export default AllPapers;