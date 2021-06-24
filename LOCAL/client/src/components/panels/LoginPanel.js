import { Modal, Form} from 'react-bootstrap'
import {React, useState} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import LoginButton from '../buttons/LoginButton';



function LoginPanel()
{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     


return(
    <Modal.Dialog>
    <Modal.Header closeButton>
      <Modal.Title>Logowanie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        required 
          type="email"
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>

        <LoginButton email={email} password={password}  />

    </Form>
    </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal.Dialog>
)
}
export default LoginPanel;


