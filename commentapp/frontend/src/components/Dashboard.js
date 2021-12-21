import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getProducts } from '../config/Myservice';
import io from 'socket.io-client';
import jwt_decode from 'jwt-decode';
import Navs from './Navs';

var socket = io('http://localhost:9999', { transports: ['websocket'] });


export default function Dashboard() {


    const [uid, setUid] = useState('')

    const [postData, setPostData] = useState([]);
    const [comment, setComment] = useState();
    //const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setUid(decode.uid)

            getProducts()
                .then(res => {
                    console.log(res.data)

                    if (res.data.err) {
                        alert(res.data.err)
                    }
                    else {
                        setPostData(res.data.products);
                    }

                })
            socket.on("op-message", (data) => {
                console.log(data);
                setPostData(data);
            });


        }
    }, [])
    const sumbitHandler = (event, post, i) => {
        event.preventDefault();
        if (comment) {
            socket.emit("message", { comment, uid }, post._id);
            setComment("");
            document.getElementById("myForm").value = "";
        }
        socket.on("chat message", (data) => {
            console.log(data);
            setPostData(data);
        });
    };


    return (
        <div>
            <Container fluid style={{ backgroundColor: "#C0F588" }}>
                <Navs /><br /><br />
                <Container className="container" style={{ marginTop: "5px" }} >

                    <Row >
                        {postData.map((item, i) =>
                            <Col lg={6} key={item._id} >

                                <div className="card" >
                                    <h5 className="card-header">POST  </h5>

                                    <div className="card-body">
                                        <p className="card-text">TITLE:{item.title}</p>
                                        <p className="card-text"> DESCRIPTION:  {item.des}</p>


                                    </div>
                                    <div className="card-body">
                                        <p className="card-text"> Comments:</p>
                                        {item.comments.map((data) => (
                                            <>
                                                <ListGroup.Item>
                                                    <p className="font-weight-light">{data.comment}{" - "}{data.uid}</p>
                                                    {/* <p >{"-"}</p> */}
                                                </ListGroup.Item>
                                            </>
                                        ))}
                                    </div>
                                    <form id="myForm" className="card-body">
                                        <input onChange={(e) => setComment(e.target.value)} placeholder="write something you want" className='form-control' /><br />
                                        <Button className='btn btn-dark' type="submit" onClick={(event) => sumbitHandler(event, item, i)}>
                                            Add Comment
                                        </Button><br />
                                    </form>
                                </div>
                            </Col>

                        )}

                    </Row>
                    <br /><br />


                </Container>
            </Container>
        </div>
    )
}
