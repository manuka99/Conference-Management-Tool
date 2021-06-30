import Header from "./component/header";
import Footer from "./component/footer";
import ConductWorkshop from "./component/conduct workshop"; 
import RegisterConference from "./component/registerConference"; 
import RegisterWorkshop from "./component/registerWorkshop";
import viewRequest from "./component/viewRequest";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
        <Header/>
        <Route path="/addProposal" exact component = {ConductWorkshop}/>
        <Route path="/addConference" exact component = {RegisterConference}/>
        <Route path="/addWorkshop" exact component = {RegisterWorkshop}/>
        <Footer/>
    </div>
    </Router>
  );
}

export default App;
