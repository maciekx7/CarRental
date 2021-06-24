import { React, useState, useEffect } from 'react'
import { Modal, Col, Form } from 'react-bootstrap'
import UpdateProfileButton from '../buttons/UpdateProfileButton';
import { APIBuilder } from "../../API.builder.js"
import API from "../../config/api.json";
import Cookies from 'js-cookie';

function ProfileUpdatePanel() {

  const [user, setUser] = useState("")

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const [validated, setValidated] = useState(false);
  const [passwordChecker, setpasswordChecker] = useState(false);
    
 /* const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
       }
       if(password == checkPassword && password != "")
       {
          setpasswordChecker(true)
          console.log("hasla ok")
       } else {
        setpasswordChecker(false)
       }  
      setValidated(true);
     };  */

  useEffect( () => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-access-token': Cookies.get('token') },
    }

    fetch(APIBuilder(API.AUTH.USERINFO.URL), requestOptions)
      .then(response => response.json())
      .then(data =>
        {
          setUser(data.user)
          setName(data.user.name)
          setSurname(data.user.lastName)
          setPhone(data.user.phone)
        })
  }, []);

  return (
    <div className={(typeof user != "undefined")}>
      {(typeof user != "undefined") ? (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Uaktualnij swoje dane</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form >
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Aktualne Hasło</Form.Label>
                  <Form.Control required type="password"
                    placeholder="Podaj hasło"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Nowe hasło</Form.Label>
                  <Form.Control  type="password"
                    placeholder="Podaj hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Powtórz nowe Hasło</Form.Label>
                  <Form.Control  type="password"
                    placeholder="Powtórz hasło"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)} />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridName">
                <Form.Label>Imię</Form.Label>
                <Form.Control placeholder="Podaj imię"
                  require
                  defaultValue={user.name}
                  onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formGridSurname">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control required placeholder="Podaj nazwisko"
                  defaultValue={user.lastName}
                  onChange={(e) => setSurname(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formGridPhone">
                <Form.Label>Telefon</Form.Label>
                <Form.Control required placeholder="Podaj numer telefonu"
                  defaultValue={user.phone}
                  onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>
              < UpdateProfileButton email={email} currentPassword={currentPassword} password={password} name={name} surname={surname} phone={phone} password2={password2} validated={validated} />


            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal.Dialog>
      ) : ('')}

    </div>
  )
}



export default ProfileUpdatePanel
