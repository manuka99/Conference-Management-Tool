import React, {useState} from "react";
import axios from "axios";

export default function RegisterConference(){
    const [name, setName]  = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [email, setEmail] = useState("");
    const [preferedWorkshop, setPreferedWorkshop] = useState("");
    const [statementOfInterest, setStatementOfInterest] = useState("");

    function sendData(e){
        e.preventDefault();

        const newRegisterConference = {
            name, 
            affiliation, 
            email, 
            preferedWorkshop, 
            statementOfInterest 
        }

        axios.post("http://localhost:8070/conference/addConf", newRegisterConference).then(()=>{
            alert("You sucessfully registered to the COnference. Link will be notified via email.")
            setName("");
            setAffiliation("");
            setEmail("");
            setPreferedWorkshop("");
            setStatementOfInterest("");
        }).catch((err)=>{
            alert(err)
        })

    }

    return(
        <div className="container">
            <form onSubmit={sendData}>
            <div class="mb-3">
                <label for="name" > Name : </label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name...."
                onChange={(e) => {
                    setName(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="affiliation" > Affiliation : </label>
                <input type="text" className="form-control" id="name" placeholder="Enter affiliation"
                onChange={(e) => {
                    setAffiliation(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="email" > Email : </label>
                <input type="email" className="form-control" id="email" placeholder="Enter your Email."
                onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="work" > Prefereed WOrkshop : </label>
                <input type="text" className="form-control" id="work" placeholder="Enter Preferred workshopn name."
                onChange={(e) => {
                    setPreferedWorkshop(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="interest" > Statement Of Interest :  </label>
                <textarea type="text" className="form-control" id="interest" placeholder="GIve your Statement of Interest..."
                onChange={(e) => {
                    setStatementOfInterest(e.target.value);
                }}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
         </form>
        </div>
    )
}