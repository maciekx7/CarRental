import { useHistory } from "react-router-dom";
import { Button, Dropdown  } from 'react-bootstrap'
import { useCookies } from "react-cookie";

function LogoutButton() {

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const history = useHistory();

    function Logout()
    {
        removeCookie("token");
        removeCookie("role");
        removeCookie("makeID");
        removeCookie("modelID");
        history.push(
          {
          pathname: '/'
          
          }) 
          window.location.reload(false);
    }

    return (
      <Dropdown.Item 
        onClick={() => Logout()}>
          Wyloguj
      </Dropdown.Item>
    );

}

export default LogoutButton