import { React, useState } from 'react'
import './styles/Header.scss'
import { Navbar, Nav, Button, Modal, Dropdown } from 'react-bootstrap'
import Cookies from 'js-cookie';
import Register from './panels/RegisterPanel';
import LoginPanel from './panels/LoginPanel';
import LogoutButton from "./buttons/LogoutButton"
import { useHistory } from "react-router-dom";
import "./styles/sb-admin-2.css"
import { FaUserCircle } from 'react-icons/fa';


const Header = (props) => {


  const [isShow, setShow] = useState(false)
  const [id, setId] = useState(false)
  const history = useHistory();
  const [background, setBackground] = useState()

  const handleHistory = () => {
    history.push("/history");
  }

  function showLogin(id_) {
    setShow(prevState => true)
    setId(id_)
  }

  function closeLogin() {
    setShow(prevState => false)
  }

  return (
    <header>
      <Navbar display="flex" fixed="top" bg="dark"  variant="dark">
        <Navbar.Brand href="/" className="brand">Zagazowani</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/cars">Katalog</Nav.Link>
          {(Cookies.get('token') != null) ? <Nav.Link onClick={handleHistory} >Historia</Nav.Link> : null}
        </Nav>

        <Dropdown alignRight>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaUserCircle />
          </Dropdown.Toggle>
          <Dropdown.Menu alignEnd>
            {((Cookies.get('token') != null) ? <Dropdown.Item href="/profile">Twój profil</Dropdown.Item> : null)}
            {((Cookies.get('role') != "user") ? <Dropdown.Item onClick={() => showLogin("register")}>Zarejestruj</Dropdown.Item> : null )}
            {((Cookies.get('token') != null) ? <LogoutButton /> : <Dropdown.Item onClick={() => showLogin("login")}> Zaloguj </Dropdown.Item>)}

          </Dropdown.Menu>
        </Dropdown>

        

      </Navbar>

      <Modal show={isShow} onHide={closeLogin}>
        {(id == "login") ? ((Cookies.get('token') != null) ? "Jesteś już zalogowany!" : <LoginPanel />) : <Register />}
      </Modal>
    </header>
  )
}

Header.defaultProps = {
  title: 'Zagazowani',
}
export default Header
