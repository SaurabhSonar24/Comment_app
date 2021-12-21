import React, { useState } from 'react'
import { loginUser } from '../config/Myservice'
// import {useHistory} from 'react-router'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router';
export default function Login() {
    // let History=useHistory();
    const [state, setState] = useState({ email: '', password: '', name: '', age: '' });
    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const navigate = useNavigate();
    const postRegis = (event) => {
        event.preventDefault();
        loginUser(state)
            .then(res => {
                console.log(res.data.msg)
                if (res.data.err == 0) {
                    localStorage.setItem("_token", res.data.token);
                    localStorage.setItem("userdetails", state.email);
                    navigate('/dashboard')
                    // History.push("/dashboard")
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }
    return (
        <div style={{ backgroundColor: "#C0F588", height: "500px" }}>
            <br /><br />
            <div className="container  bg-light col-5" style={{ height: "400px" }}>
                <h1 className="text-center display-4 text-uppercase">Login</h1>
                <br /><br />
                <form method="post" onSubmit={postRegis}>
                    <div className="form-group">
                        <label> EMAIL</label>
                        <input type="email" name="email" className="form-control" onChange={handler} />
                    </div><br /><br />
                    <div className="form-group">
                        <label> PASSWORD</label>
                        <input type="password" name="password" className="form-control" onChange={handler} />
                    </div><br /><br />
                    <div className="row">

                        <div className="col-6 text-center">
                            <input type="submit" value="LOGIN" className="btn btn-dark " />
                        </div>
                        <div className="col-6 text-center">
                            <p className=" text-uppercase btn btn-dark"> <Link to="/Reg" style={{ "color": "white", textDecoration: "none" }}>Register </Link></p>
                        </div>

                    </div>
                </form><br /><br />

            </div>
        </div>

    )
}


