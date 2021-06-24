import React, { useState } from 'react'
import { Col, Form, Modal, Row, Button, Container } from 'react-bootstrap'
import MarkList from '../lists/MarkList';
import ModelList from '../lists/ModelList';
import Cookies from 'js-cookie';
import AddModel from './AddModelPanel';
import AddMark from './AddMakePanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteMakeButton from '../buttons/DeleteMakeButton';
import DeleteModelButton from '../buttons/DeleteModelButton';
import { APIBuilder, APIBuilderDynamic } from "../../API.builder.js"
import API from "../../config/api.json";
import '../styles/Panel.scss';
import { useCookies } from "react-cookie";
import { BsPlus } from 'react-icons/bs';

function AddCarPanel() {

  const [cost, setCost] = useState("");
  const [vin, setVin] = useState("");
  const [availability, setAvailability] = useState("");
  const [carModelId, setCarModelId] = useState("");
  const [isShow, setShow] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [file, setFile] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  var fileSelectedHandler = event => {
    setFile(event.target.files[0]);
  }



  async function addCar() {
    var id = Cookies.get('modelID')
    console.log(id)
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': Cookies.get('token') },
      body: JSON.stringify({
        cost: cost,
        VIN: vin,
        availability: 1,
        CarModelId: id
      })
    }

    var responseCar = await fetch(APIBuilder(API.CARS.URL), requestOptions);
    var Car = await responseCar.json();
    if (responseCar.ok) {
      var filename = "car_" + Car.car.id;
      console.log(filename);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);
      var requestOptions1 = {
        method: 'POST',
        body: formData
      }
      console.log(requestOptions1);
      var imageResponse = await fetch(APIBuilder(API.UPLOAD_JPG.URL), requestOptions1);
      console.log(imageResponse);
      var response = await imageResponse.json();
      if (imageResponse.ok) {
        toast.success(response.message);
      } else {
        const requestOptions2 = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'x-access-token': Cookies.get('token') },

        }
        fetch(APIBuilderDynamic(API.CARS.URL, Car.car.id), requestOptions2)
        toast.warning(response.message);
      }
      //toast.success(Car.message);
      removeCookie("makeID");
      removeCookie("modelID");
    } else {
      toast.warning(Car.message)
    }
  }



  function show(type) {
    setShow(prevState => true)
    setPopupType(type)
  }

  function closeLogin() {
    setShow(prevState => false)
  }


  return (
    
    <div className='imgDiv2'>
      <br/>
      <Container className='cont'>
      <Form>
        <br/><br/><br/>
        <Row>


              
              <Col xs={2}></Col>
              <Col>
              <h2>Model samochodu</h2>
              <ModelList value={carModelId} onChange={(e) => setCarModelId(e.target.value)} />
              </Col>
              <Col xs={1}>
                <br/><br/>
                <Button  variant="success" onClick={() => show()} >
                  <BsPlus/>
                </Button>
                </Col>
                <Col xs={1}>
                <br/><br/>
                < DeleteModelButton />
                </Col>
              <Col xs={3}></Col>
       
                <Col xs={1}></Col>

            </Row>
            <br/>
            <Row>

              <Col xs={2}></Col>
              <Col>
              <h2>Dzienny koszt</h2>
              <Form.Control
                required
                placeholder="Podaj dzinny koszt koszt" value={cost}
                onChange={(e) => setCost(e.target.value)} />
                <br/>
                <h2>Zdjecie pojazdu</h2>
                <input
                  type="file"
                  accept=".jpg"
                  onChange={fileSelectedHandler} />
                  </Col>
                  <Col></Col><Col></Col>
              </Row>
              <br/>
              <Row>
              <Col xs={2}></Col>
              <Col>
              <h2>VIN</h2>
              <Form.Control
                required
                placeholder="Podaj vin"
                value={vin}
                onChange={(e) => setVin(e.target.value)} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
              <Col></Col><Col></Col>
              </Row>
                <br/>
              <Row>
              
              <Modal show={isShow} onHide={closeLogin}>
               <AddModel></AddModel> 
              </Modal>
              <Col xs={2}></Col>
              <Col>
              <Button className='btn1' variant="primary" onClick={() => addCar()} >
                Zatwierdz
              </Button>
              </Col>

              </Row>

      </Form>
      </Container>
    </div>
  )
}

export default AddCarPanel;
