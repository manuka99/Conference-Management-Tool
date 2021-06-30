import React, {useState} from "react";
import axios from "axios";

export default function RegisterWorkshop(){
    const [name, setName]  = useState("");
    const [affiliation, setAffiliation] = useState("");
    const [email, setEmail] = useState("");
    const [preferedWorkshop, setPreferedWorkshop] = useState("");
    const [statementOfInterest, setStatementOfInterest] = useState("");
    const [paymentType, setPaymentType]  = useState("");
    const [paymentValue, setPaymentValue]   = useState("");
    const [date, setDate]  = useState("");

    function sendData(e){
        e.preventDefault();

        const newRegisterWorkshop = {
            name, 
            affiliation, 
            email, 
            preferedWorkshop, 
            statementOfInterest,
            paymentType, 
            paymentValue,  
            date 
        }

        axios.post("http://localhost:8070/workshop/addReq", newRegisterWorkshop ).then(()=>{
            alert("You sucessfully registered to the Workshop. Link will be notified via email.")
            setName("");
            setAffiliation("");
            setEmail("");
            setPreferedWorkshop("");
            setStatementOfInterest("");
            setPaymentType("");
            setPaymentValue("");
            setDate("");
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

            <div class="mb-3">
                <label for="type" > Payment Type :  </label>
                <input type="type" className="form-control" id="type" placeholder="Enter your paymnt method."
                onChange={(e) => {
                    setPaymentType(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="value" > Amount :  </label>
                <input type="text" className="form-control" id="amount" placeholder="Enter your paid amount."
                onChange={(e) => {
                    setPaymentValue(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="date" > Date of Payment :  </label>
                <input type="date" className="form-control" id="Date" placeholder="Enter Date of payment."
                onChange={(e) => {
                    setDate(e.target.value);
                }}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
         </form>
        </div>
    )
}