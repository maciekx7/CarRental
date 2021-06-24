import '../styles/CarsClient.scss';
import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Container, Button } from 'react-bootstrap'
import { APIBuilder, APIBuilderWIthParam } from "../../API.builder.js"
import API from "../../config/api.json";
import { IconName } from "react-icons/fc";
import Table2 from "../tables/CarTable"
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import { BsPlus } from 'react-icons/bs';



const CarsPanel = () => {

    const [cars, setCars] = useState([]);
    
    const history = useHistory();

    const handleAddCar = () => {
        history.push("/addNewCar");
    }

    useEffect(() => {
        fetch(APIBuilderWIthParam(API.CARS.URL, API.CARS.PARAMS.AVAILABILITY.PARAM, API.CARS.PARAMS.AVAILABILITY.STATUS.YES))
        .then(response => response.json())
            .then(data => setCars(data.car));

    }, []);

    function filter(id) {
        if (id == "1") {

            fetch(APIBuilderWIthParam(API.CARS.URL, API.CARS.PARAMS.AVAILABILITY.PARAM, API.CARS.PARAMS.AVAILABILITY.STATUS.YES))
                .then(response => response.json())
                .then(data => setCars(data.car));
            // window.location.reload(false); 
        } else if(id == "0") {
            //window.location.reload(false); 
            fetch(APIBuilder(API.CARS.URL))
                .then(response => response.json())
                .then(data => setCars(data.car));
        } else if(id == "2") {
            fetch(APIBuilderWIthParam(API.CARS.URL,API.CARS.PARAMS.AVAILABILITY.PARAM, API.CARS.PARAMS.AVAILABILITY.STATUS.NO ))
            .then(response => response.json())
            .then(data => setCars(data.car));

        }
        

    }


    const columns = [['Id', ''], ['Marka'], ['Model'], ['Typ'], ['Rok'], ['Moc'], ['Cena'], ['']];

    return (
        <div className='imgDiv'>
            <Container className="cont">
                <Row className="row1">
                    <h2 className="title2">Wybierz swoj wymarzony samochod!</h2>
                    
                    <Col className='colC'>
                        <Form.Group className='formC'>
                            <Form.Label>Status wypozyczenia</Form.Label>
                            <Form.Check id="1" name="state" label="Dostępne" type="radio" onClick={() => filter("1")} defaultChecked={true} />
                            <Form.Check id="2" name="state" label="Niedostępne" type="radio" onClick={() => filter("2")} />
                            <Form.Check id="0" name="state" label="Wszystkie" type="radio" onClick={() => filter("0")} />
                        </Form.Group>
                    </Col>
                    <Col>
                    {(Cookies.get('role') == "admin") ? <Button className='btnSuc' variant="success" onClick={handleAddCar} > <BsPlus /> </Button> : null}
                    </Col>
                    <Col className='colC' xs={10}>
                        <Table2 columns={columns} data={cars} type={"car"} />
                        
                    </Col>

                </Row>

            </Container>

        </div>
    )
}

export default CarsPanel
