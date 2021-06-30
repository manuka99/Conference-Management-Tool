import React, { Component } from 'react';
import axios from 'axios';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: []
      
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/user/field/${this.props.match.params.id}`)
    .then (response => {
      this.setState({ interests: response.data.interests })
      console.log(response.data.data)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
          <br></br>
        <h2> Interest Fields  </h2>
        
        {this.state.interests.length > 0 && this.state.interests.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="p-3">
              <h4> Name: {item.name}</h4>
              <h5> Description: {item.description}</h5>
              
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Interests;