import React from 'react'
import { Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Navs() {


    return (
        <>


            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">CommentGram</a>
                    <br /><br />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ms-auto text-uppercase">
                            <a class="nav-link active" aria-current="page" ><Link to="/dashboard" class="nav-link text-dark">DASHBOARD</Link></a>
                            <a class="nav-link"> <Link to="/addpost" class="nav-link text-dark">ADDPOST</Link></a>
                            <a class="nav-link"> <Link to="/" class="nav-link btn btn-light text-dark  text-uppercase">logout</Link></a>


                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

{/* <Dashboard/> */ }
