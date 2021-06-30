import React , {Component} from 'react';

class NavBar extends Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div>
                
<nav className="navbar navbar-dark bg-primary  navbar-expand-lg ">
  <div className="container-fluid">
 
    <a className="navbar-brand" href="/admin">Admin</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="nav-link" href="/home">Home</a>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="/create-user">Researcher Registration</a>
        <a className="nav-link" href="/create-paper">Add Papers</a>
        <a className="nav-link" href="/all-paper">My Papers</a>
        <a className="nav-link " href="/paper-upload" >Add Templates</a>
        <a className="nav-link " href="#" >Templates</a>
      </div>
    </div>
  </div>
</nav>
            </div>
        )
    }
}

export default NavBar;