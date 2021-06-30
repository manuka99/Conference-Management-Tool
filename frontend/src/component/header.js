import React from "react";
import {Link} from "react-router-dom";

export default function Headrer() {
    return(
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Conference</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Workshop</a>
            </li>
            <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Registration</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="/addProposal">Conduct Workshop/Conference</a>
                        <a class="dropdown-item" href="/addConference">Register for Conference</a>
                        <a class="dropdown-item" href="/addWorkshop">Register for Workshop</a>
                    </div>
                </li>
          <li class="nav-item">
              <a class="nav-link" href="/view">Workshop</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}