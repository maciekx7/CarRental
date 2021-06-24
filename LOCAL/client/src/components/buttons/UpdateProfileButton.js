import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIBuilder } from "../../API.builder"
import API from "../../config/api.json";

function UpdateProfileButton(props) {

  const {validated, currentPassword, password2, password, name, surname, phone } = props;

  const notify = (message) => toast(message);


  function update() {
if(password == password2 )
{
  console.log("true ")
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-access-token': Cookies.get('token') },
      body: JSON.stringify({
        name: name,
        lastName: surname,
        phone: phone,
        password: password,
        currentPassword: currentPassword
      })
    }
    console.log(requestOptions.body);
    fetch(APIBuilder(API.AUTH.UPDATE.URL), requestOptions) 
      .then((response) => {
        if (response.ok) {
          window.location.reload(false);
        } else {
          return response.json();
        }
      })
      .then((result) => {
        console.log(result);
        notify(result.message)
      })
    } else{
      notify("Podane hasła są różne")
    }
  }

  return (
    <div>
      <ToastContainer />
      <Button
        variant="primary" 
        onClick={() => update()}
      >
        Aktualizuj
      </Button>
    </div>
  );
}

export default UpdateProfileButton

