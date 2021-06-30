import React, {useState} from "react";
import axios from "axios";

export default function ConductWorkshop(){
    const [title,setTitle] = useState("");
    const [organizer_name,setOrganizer_name] = useState("");
    const [organizer_affiliation,setOrganizer_affiliation]  = useState("");
    const [organizer_email,setOrganizer_email] = useState("");
    const [Scope, setScope] = useState("");
    const [biography, setBiography] = useState("");
    const [potential_participant, setPotential_Participant] = useState("");
    const [duration, setDuration] = useState("");
    const [preferred_day, setPreferred_day] = useState("");
    const [referred_papers, setReferred_papers] = useState("");

    function sendData(e){
        e.preventDefault();

        const newWorkshop = {
            title, 
            organizer_name,
            organizer_affiliation,
            organizer_email,
            Scope,
            biography,
            potential_participant, 
            duration, 
            preferred_day, 
            referred_papers 
        }

        axios.post("http://localhost:8070/proposal/add", newWorkshop).then(() => {
            alert("Your proposal sucessfully submitted. You will notify via email.")
            setTitle("");
            setOrganizer_name("");
            setOrganizer_affiliation("");
            setOrganizer_email("");
            setScope("");
            setBiography("");
            setPotential_Participant("");
            setDuration("");
            setPreferred_day("");
            setReferred_papers("");
        }).catch((err) => {
            alert("Submission Failed!") 
        })
    }

    return(
        <div className="container">
            <form onSubmit={sendData}>
            <div class="mb-3">
                <label for="title" > Title : </label>
                <input type="text" className="form-control" id="title" placeholder="Enter the Title of Conference / Workshop"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="name" > Orgaanizer Name : </label>
                <input type="text" className="form-control" id="name" placeholder="Enter the Organizer Name"
                onChange={(e) => {
                    setOrganizer_name(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="affiliation" > Orgaanizer's Affiliation : </label>
                <input type="text" className="form-control" id="affiliation" placeholder="Enter the Organizer's Affiliation."
                onChange={(e) => {
                    setOrganizer_affiliation(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="email" > Orgaanizer's Email : </label>
                <input type="email" className="form-control" id="email" placeholder="Enter the Organizer's Email."
                onChange={(e) => {
                    setOrganizer_email(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="scope" > Scope :  </label>
                <textarea type="text" className="form-control" id="scope" placeholder="Enter the Scope planned to cover."
                onChange={(e) => {
                    setScope(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="bio" > Biograpghy :  </label>
                <textarea type="text" className="form-control" id="bio" placeholder="Enter the biograpghy of organizer."
                onChange={(e) => {
                    setBiography(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="Participant" > Potantial Participant :  </label>
                <textarea type="text" className="form-control" id="participant" placeholder="Enter the details pf potential participant. (Program Comitte Members, Invited Speakers)"
                onChange={(e) => {
                    setPotential_Participant(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="time" > Planned Duration : </label>
                <input type="text" className="form-control" id="time" placeholder="Enter the Duration."
                onChange={(e) => {
                    setDuration(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="date" > Preferred Day : </label>
                <input type="date" className="form-control" id="date" placeholder="Enter the Preferred Date."
                onChange={(e) => {
                    setPreferred_day(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="reference" > Name of the refereed Papers :  </label>
                <textarea type="text" className="form-control" id="reference" placeholder="Enter your references."
                onChange={(e) => {
                    setReferred_papers(e.target.value);
                }}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
         </form>
        </div>
    )
}