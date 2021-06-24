import { React, useState, useEffect } from 'react'
import '../styles/clientProfile.scss'
import { Col, Row, Image, Button, Modal, Container } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import ProfileUpdatePanel from './ProfileUpdatePanel'
import Cookies from 'js-cookie';
import { APIBuilder, APIBuilderJPG } from "../../API.builder.js"
import API from "../../config/api.json";



const ProfilePanel = () => {

    const [isShow, setShow] = useState(false)

    const [user, setUser] = useState("")

    function show() {
        setShow(prevState => true)
    }

    function close() {
        setShow(prevState => false)
    }

    const history = useHistory();

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-access-token': Cookies.get('token') },
        }

        fetch(APIBuilder(API.AUTH.USERINFO.URL), requestOptions)
            .then(response => response.json())
            .then(data => setUser(data.user))
            .then(console.log("user" + user))
    }, []);

    return (

        <div className={(typeof user != "undefined")}>
            {(typeof user != "undefined") ? (
                <div className='imgDiv'>
                    <Container className='cont'>
                        <Row className="row1">
                            <Col></Col>
                        </Row>
                        <br/><br/><br/><br/><br/><br/>
                        <Row className="row1">
                            <Col lg={4}>
                                <div className='div2'>
                                    <h2>Dane osobowe</h2>
                                    <div>
                                        Numer klienta: {user.id}<br />
                                        Imie: {user.name} <br />
                                        Nazwisko: {user.lastName} <br />
                                        Nr telefonu: {user.phone} <br />
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <p> <Image className="img" src={APIBuilderJPG("panda")} alt="picture" fluid rounded /> </p>
                            </Col>
                            <Col lg={4}>
                                <div className='div2'>
                                    <h2>Konto</h2>

                                            Email: {user.email} <br />
                                    {(Cookies.get('token') != null) ? <Button onClick={() => show()} >Edytuj dane</Button> : null}<br /><br />


                                </div>
                            </Col>
                        </Row>
                        <Modal show={isShow} onHide={close}>
                            <ProfileUpdatePanel />
                        </Modal>
                    </Container>
                </div>
            ) : ('')}

        </div>







    )


}



export default ProfilePanel
