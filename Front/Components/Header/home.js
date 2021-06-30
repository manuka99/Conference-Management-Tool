import React , {Component} from 'react';
import paper from '../Assets/Images/paper.jpg';
import conf from '../Assets/Images/conf.png';


class Home extends Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div  style = {{backgroundImage: `url(${paper})`,backgroundRepeat: 'repeat',backgroundPosition:'centre'
            }}>
            

 <br></br>
  
  <img src={conf} className="rounded mx-auto d-block"  style = {{width: 400, height:400,borderWidth:10,borderRadius:'10px'}}alt="..."/>
                <div className="d-grid gap-2 col-6 mx-auto"   >
                < a href='#' className="btn btn-secondary btn-lg" style={{marginTop:5}} role='button'> Workshop Management </a>
                < a href='#' className="btn btn-secondary btn-lg" style={{marginTop:10}} role='button'> Conference Mangement</a>
                 < a href='#' className="btn btn-secondary btn-lg" style={{marginTop:10}} role='button'> Paper Management</a>
                 < a href='#' className="btn btn-secondary btn-lg" style={{marginTop:10,marginBottom:50}} role='button'> Review Management</a>
</div>
</div>



        )
    }
}

export default Home;