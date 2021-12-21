import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { registerUser } from '../config/Myservice';
import { useNavigate } from 'react-router';

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Registration() {
    let [name, setName] = useState('');
    let [lname, setLname] = useState('');
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmpassword, setConfirmpassword] = useState('');
    const navigate = useNavigate();

    const register = () => {
        let data = { name: name, lname: lname, username: username, email: email, password: password, confirmpassword: confirmpassword };
        registerUser(data)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err)
                }
                else {
                    alert(res.data.msg)
                    navigate('/')
                }
            });

    }


    return (
        <Container className="container col-8 p-4 " style={{ backgroundColor: "#C0F588" }}>
            <h1 className="text-center text-uppercase display-4">Registration </h1>
            <Form className="container col-8">


                <Form.Group className="mb-3" >
                    <Form.Label>FirstName:</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" name="name" id="name" onChange={(event) => { setName(event.target.value) }} required />
                    {name != '' && name.length < 4 && <span className="text-danger">Enter firstName correctly</span>}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>LastName:</Form.Label>
                    <Form.Control type="email" placeholder="Enter Last Name" name="lname" id="lname" onChange={(event) => { setLname(event.target.value) }} required />
                    {name != '' && name.length < 4 && <span className="text-danger">Enter lastName correctly</span>}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Name" name="username" id="username" onChange={(event) => { setUsername(event.target.value) }} required />
                    {name != '' && name.length < 4 && <span className="text-danger">Enter userName correctly</span>}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={(event) => { setEmail(event.target.value) }} required />
                    {email != '' && !regForEmail.test(email) && <span className="text-danger">Enter email  correctly</span>}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Pasword:</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={(event) => { setPassword(event.target.value) }} required />
                    {password != '' && password.length < 8 && <span className="text-danger">Enter password  correctly</span>}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter ConfirmPassword" name="confirmpassword" id="confirmpassword" onChange={(event) => { setConfirmpassword(event.target.value) }} required />
                    {confirmpassword != '' && confirmpassword != password && <span className="text-danger">Passwords doesn't match</span>}
                </Form.Group>


                <Row className='text-center'>
                    <Col md={6}>
                        <Button variant="dark" onClick={register}>Register</Button>
                    </Col>
                    <Col md={6}>
                        <Button variant="dark" type="submit" href="/" className="ml-3"> Login</Button>
                    </Col>
                </Row>
            </Form>
        </Container>

    )
}
