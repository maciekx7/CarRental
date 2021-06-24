import React, {useState} from 'react'
import { Col, Form, Modal } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterButton from '../buttons/RegisterButton';
import Cookies from 'js-cookie';



function RegisterPanel()
{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [validated, setValidated] = useState(false);
    const [passwordChecker, setpasswordChecker] = useState(false);
      
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
         }
         if(password == confirmPassword && password != "")
         {
            setpasswordChecker(true)
            console.log("takie same")
         }     
        setValidated(true);
       };  
  
return(
  <Modal.Dialog>
  <Modal.Header closeButton>
    
    {(Cookies.get('role') == "admin") ? <Modal.Title>Dodaj nowego administratora</Modal.Title> : <Modal.Title>Rejestracja</Modal.Title>}<br /><br />
  </Modal.Header>
  <Modal.Body>
  <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <ToastContainer />
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control required type="email" 
            placeholder="Podaj email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Hasło</Form.Label>
      <Form.Control required type="password"
                    placeholder="Podaj hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
    </Form.Group>

    
    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Potwierdź hasło</Form.Label>
      <Form.Control required type="password"
                    placeholder="Powtórz hasło"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridName">
    <Form.Label>Imię</Form.Label>
    <Form.Control   required placeholder="Podaj swoje imię"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formGridSurname">
    <Form.Label>Nazwisko</Form.Label>
    <Form.Control  required placeholder="Podaj swoje nazwisko"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formGridPhone">
    <Form.Label>Telefon</Form.Label>
    <Form.Control  required placeholder="Podaj swój numer telefonu"
                    value={phone} type="number"
                    onChange={(e) => setPhone(e.target.value)} />
  </Form.Group>

    < RegisterButton email={email} password={password} name={name} surname={surname} phone={phone} validate={validated} confirmPassword={passwordChecker} />

  </Form>
</Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal.Dialog>
)
}
export default RegisterPanel;


