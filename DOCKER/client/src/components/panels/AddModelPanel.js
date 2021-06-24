
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'
import { React, useState } from 'react'
import MarkList from "../lists/MarkList";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilder } from "../../API.builder.js"
import API from "../../config/api.json";
import AddMark from "./AddMakePanel";
import DeleteMakeButton from ".././buttons/DeleteMakeButton"
import { useCookies } from "react-cookie";
import { BsPlus } from 'react-icons/bs';

function AddModelPanel() {

  const [name, setName] = useState("");
  const [fuel, setFuel] = useState("");
  const [body, setBody] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [isShow, setShow] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);


  const notify = (message) => toast(message);

  function addModel() {


    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'x-access-token': Cookies.get('token')
      },
      body: JSON.stringify({
        name: name,
        fuel: fuel,
        body: body,
        productionYear: year,
        enginePower: engine,
        MakeId: Cookies.get('makeID')
      })
    };
    fetch(APIBuilder(API.MODELS.URL), requestOptions)
      .then((response) => {
        if (response.ok) {
          removeCookie("makeID");
          window.location.reload(false);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        console.log(result);
        notify(result.message)
      })

  }


  function show() {
    setShow(prevState => true)
  }

  function closeLogin() {
    setShow(prevState => false)
  }




  return (

    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj nowy model samochodu</Modal.Title>
      </Modal.Header>
      <Form >
      <Modal.Body>
        
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nazwa modelu</Form.Label>
              <Form.Control
                required placeholder="Podaj nazwę modelu" value={name}
                onChange={(e) => setName(e.target.value)} />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridFuel">
              <Form.Label>Rodzaj paliwa</Form.Label>
              <Form.Control
              as="select"
              // className="select"
              custom
              onChange={e => setFuel(e.target.value)} >
                <option value="">Wybierz</option>
              <option value="PB">PB</option>
              <option value="ON">ON</option>
              <option value="GAS">GAS</option>
            </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridBody">
            <Form.Label>Typ nadwozia</Form.Label>

            <Form.Control
              as="select"
              // className="select"
              custom
              onChange={e => setBody(e.target.value)} >
                <option value="">Wybierz</option>
              <option value="SUV">SUV</option>
              <option value="WAGON">WAGON</option>
              <option value="LIMUZINE">LIMUZINE</option>
              <option value="SEDAN">SEDAN</option>
              <option value="HATCHBACK">HATCHBACK</option>
            </Form.Control>




          </Form.Group>






          <Form.Group controlId="formGridCarYear">
            <Form.Label>Rok produkcji</Form.Label>
            <Form.Control required type="number" placeholder="Podaj rok produkcji"
              value={year}
              onChange={(e) => setYear(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formGridCarEngine">
            <Form.Label>Silnik</Form.Label>
            <Form.Control required type="number" placeholder="Podaj moc silnika"
              value={engine}
              onChange={(e) => setEngine(e.target.value)} />
          </Form.Group>
          
          <Form.Group required controlId="formGridCarMark">
            <Form.Label>Marka samochodu</Form.Label>
            <Row>
              <Col>
              <MarkList />
              </Col>
              <Col xs={2}>
              <Button  variant="success" onClick={() => show()} >
              <BsPlus/>
            </Button>
              </Col>
              <Col xs={2}>
              <DeleteMakeButton />
              </Col>
            </Row>

            </Form.Group>
            
            <Button  variant="primary" onClick={() => addModel()} >
            Zatwierdz
          </Button>

              <Modal show={isShow} onHide={closeLogin} >
            <AddMark></AddMark>
          </Modal>
          </Modal.Body>
        </Form>
        
    </Modal.Dialog>

  )
}
export default AddModelPanel;
