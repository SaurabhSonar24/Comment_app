import React, { useState } from 'react'
import { Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getDetails } from '../config/Myservice';
import Navs from './Navs';

export default function Data() {
    let [title, setTitle] = useState('');
    let [des, setDes] = useState('');
    const navigate = useNavigate();

    const submitForm = () => {
        let data = { title: title, des: des };

        getDetails(data)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err)
                }
                else {
                    alert(res.data.msg)
                    navigate('/dashboard')
                }
            });
    }

    return (
        <Container className="d-flex justify-content-center mt-5" >


            <Form className="container col-6 " style={{ backgroundColor: "#C0F588" }}>
                <h2 className="pb-4 text-center display-5">USER INFO </h2>

                <Form.Group >
                    <Form.Label column sm="2">
                        Title
                    </Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="Enter title" name="title" onChange={(e) => { setTitle(e.target.value) }} />

                    </Col>
                </Form.Group>
                <br />
                <Form.Group  >
                    <Form.Label >
                        Description
                    </Form.Label>
                    <Col >
                        <Form.Control type="text" placeholder="Enter description" name="des" onChange={(e) => { setDes(e.target.value) }} />

                    </Col>
                </Form.Group>
                <br />
                <div className=" text-center text-uppercase">
                    <Button variant="dark" onClick={submitForm}>submit</Button>
                </div>
                <br />
            </Form>
            <br />
        </Container>

    )
}
