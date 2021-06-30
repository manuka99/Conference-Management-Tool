import React , {Component} from 'react';

class Header extends Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div>
<ul className="nav flex-column " >
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Paper Management</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/create-paper">Add Papers</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">My Papers</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Add Templates</a>
  </li>
</ul>
            </div>
        )
    }
}

export default Header;